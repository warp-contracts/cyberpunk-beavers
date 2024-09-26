
local json = require('json')
local sqlite3 = require("lsqlite3")



-- Open the database
db = db or sqlite3.open_memory()

local initResult = db:exec([[
alter table global_leaderboard
add column user_name TEXT;

alter table game_leaderboard
add column user_name TEXT;
]])


Handlers.remove("addGameScores")
Handlers.remove("globalScores")


local function insertScores(hubProcessId, gameProcessId, playerScores)
    createHubAndGame(hubProcessId, gameProcessId)

    for wallet, data in pairs(playerScores) do
        insertSingleGameScores(gameProcessId, wallet, data)
        updateGlobalScore(wallet, data)
    end
end

function createHubAndGame(hubProcessId, gameProcessId)
    local newHubStmt = db:prepare([[
        insert or ignore into game_hub_session(ao_process_id) VALUES (?)
    ]])
    if not newHubStmt then
        error(hubProcessId .. " preparing game hub session failure: " .. db:errcode() .. " " .. db:errmsg())
    end

    local newHubBind = newHubStmt:bind_values(hubProcessId)
    if not newHubBind then
        error(hubProcessId .. " binding game hub session failure: " .. db:errcode() .. " " .. db:errmsg())
    end

    executeStatement(newHubStmt, "New hub")

    local newGameStmt = db:prepare([[
        with new_game(process_id) as (values (?))
        insert or ignore into game(ao_process_id, game_hub_session_id)
        select process_id, game_hub_session.id
        from new_game
            join game_hub_session on game_hub_session.ao_process_id = ?
    ]])
    if not newGameStmt then
        error(gameProcessId .. " preparing new game failure: " .. db:errcode() .. " " .. db:errmsg())
    end

    local newGameBind = newGameStmt:bind_values(gameProcessId, hubProcessId)
    if not newGameBind then
        error(gameProcessId .. " binding new game failure: " .. db:errcode() .. " " .. db:errmsg())
    end

    executeStatement(newGameStmt, "New game")
end

function insertSingleGameScores(game_process_id, wallet, data)
    local tokens = data.tokens
    local kills = data.kills
    local userName = data.userName
    local stmt = db:prepare([[
        with scores(wallet, user_name, frags, deaths, cbcoin, tio, war, trunk, rsg, gun) as (
            values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        )
        insert into game_leaderboard(user_wallet_address, user_name, game_id, frags, deaths, cbcoin, tio, war, trunk, rsg, gun)
        SELECT wallet, user_name, game.id,
               coalesce(frags, 0),
               coalesce(deaths, 0),
               coalesce(cbcoin, 0),
               coalesce(tio, 0),
               coalesce(war, 0),
               coalesce(trunk, 0),
               coalesce(rsg, 0),
               coalesce(gun, 0)
        from scores
            cross join game on ao_process_id = ?;
    ]])
    if not stmt then
        error("Error preparing statement: " .. (db:errmsg() or "Unknown error"))
    end

    local ok, bind_err = pcall(stmt.bind_values, stmt,
        wallet, userName,
        kills.frags or 0, kills.deaths or 0,
        tokens.cbcoin or 0, tokens.tio or 0, tokens.war or 0, tokens.trunk or 0,
        tokens.rsg or 0, tokens.gun or 0,
        game_process_id)
    if not ok then
        stmt:finalize()
        error("Error binding values: " .. (bind_err or "Unknown error"))
    end

    executeStatement(stmt, "Single game scores")
end


function updateGlobalScore(wallet, data)
    local globalUpdateStmt = db:prepare([[
        insert into global_leaderboard(user_wallet_address, user_name, frags, deaths, cbcoin, tio, war, trunk, rsg, gun)
        values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON conflict
            DO UPDATE
            SET
                user_name = coalesce(user_name, excluded.user_name),
                frags = frags + excluded.frags,
                deaths = deaths + excluded.deaths,
                cbcoin = cbcoin + excluded.cbcoin,
                tio = tio + excluded.tio,
                war = war + excluded.war,
                trunk = trunk + excluded.trunk,
                rsg = rsg + excluded.rsg,
                gun = gun + excluded.gun;
    ]])
    if not globalUpdateStmt then
        error("Preparing update global score failure: " .. db:errcode() .. " " .. db:errmsg())
    end

    local globalUpdateBind = globalUpdateStmt:bind_values(
        wallet, data.userName,
        data.kills.frags or 0, data.kills.deaths or 0,
        data.tokens.cbcoin or 0, data.tokens.tio or 0, data.tokens.war or 0, data.tokens.trunk or 0,
        data.tokens.rsg or 0, data.tokens.gun or 0)
    if not globalUpdateBind then
        error("Binding update global failure: " .. db:errcode() .. " " .. db:errmsg())
    end

    executeStatement(globalUpdateStmt, "Updating global score ")
end


local function readGlobalScore(caller, orderBy, limit, offset)
    local scoreResult = {}
    local stmt = db:prepare(string.format([[
        with totals as (select count(*) as value
                        from global_leaderboard),
             numbered as (SELECT ROW_NUMBER() OVER (ORDER BY %s DESC ) row_num,
                                 totals.value as                             total,
                                 *
                          FROM global_leaderboard
                                   cross join totals),
             page as (select *
                      from numbered
                      limit ? offset ?)
        select * from page
        union
        select * from numbered where user_wallet_address = ?
    ]], orderBy))
    if not stmt then
        error(db:errmsg())
    end

    local bind = stmt:bind_values(limit, offset, caller)
    if not bind then
        error(db:errmsg())
    end


    for row in stmt:nrows("") do
      table.insert(scoreResult, {
        rowNum = row.row_num,
        rowTotal = row.total,
        wallet = row.user_wallet_address,
        userName = row.user_name,
        frags = row.frags,
        deaths = row.deaths,
        cbcoin = row.cbcoin,
        tio = row.tio,
        war = row.war,
        trunk = row.trunk,
        rsg = row.rsg,
        gun = row.gun
      })
    end
    stmt:finalize()

    return scoreResult
end


Handlers.add("addGameScores", "AddGameScores", function (msg)
  if msg.From == msg.Owner and msg.Owner ~= Owner then
    ao.send({
      Target = msg.From,
      Data = msg.Owner ..  " is unauthorized" })
    return
  end

  if not msg.Tags.HubProcessId then
    msg.reply({
      Action = 'Release-Error',
      ['Message-Id'] = msg.Id,
      Error = 'You need to provide the hub process id '
    })
    return
  end
  local hubProcessId = msg.Tags.HubProcessId
  local gameProcessId = msg.From
  local playerScores = json.decode(msg.Data)
  insertScores(hubProcessId, gameProcessId, playerScores)
end)

Handlers.add("globalScores", "GlobalScores", function (msg)
  local caller = msg.Owner
  local limit = msg.Tags.Limit or 10
  local offset = msg.Tags.Offset or 0
  local orderBy = 'cbcoin'
  if msg.Tags.OrderBy and OrderBy[msg.Tags.OrderBy] then
    orderBy = msg.Tags.OrderBy
  end
  local scoresResult = readGlobalScore(caller, orderBy, limit, offset)
  local resultEncoded = json.encode(scoresResult)
  print(resultEncoded)
end)
