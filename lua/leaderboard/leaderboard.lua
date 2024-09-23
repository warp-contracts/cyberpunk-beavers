
local json = require('json')
local sqlite3 = require("lsqlite3")


Variant = "0.0.3"

Name = Name or 'CyberBeaver Leaderboard'
Ticker = Ticker or 'cbLeaderboard'
Logo = Logo or 'WATOlqtoEaO2IsZyUaG-en3qLxPwUnCKLu3SnEm42SY'
Owner = Owner or ao.env.Process.Owner

ao.authorities = {
    "f70fYdp_r-oJ_EApckTYQ6d66KaEScQLGTllu98QgXg",
    "fcoN_xJeisVsPXA-trzVAuIiqO3ydLQxM-L4XbrQKzY",
    "jmGGoJaDYDTx4OCM7MP-7l-VLIM4ZEGCS0cHPsSmiNE"}


-- Open the database
db = db or sqlite3.open_memory()

--[[
    init db
--]]
local initResult = db:exec([[
create table if not exists game_hub_session(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ao_process_id TEXT UNIQUE NOT NULL
);

create table if not exists game(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ao_process_id TEXT UNIQUE NOT NULL,
    game_hub_session_id INTEGER NOT NULL,
    FOREIGN KEY (game_hub_session_id) REFERENCES game_hub_session(id)
);

create table if not exists game_leaderboard(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER,
    user_wallet_address TEXT NOT NULL,
    frags INTEGER NOT NULL DEFAULT 0,
    deaths INTEGER NOT NULL DEFAULT 0,
    cbcoin INTEGER NOT NULL DEFAULT 0,
    tio INTEGER NOT NULL DEFAULT 0,
    war INTEGER NOT NULL DEFAULT 0,
    trunk INTEGER NOT NULL DEFAULT 0,
    rsg INTEGER NOT NULL DEFAULT 0,
    gun INTEGER NOT NULL DEFAULT 0,
    UNIQUE (game_id, user_wallet_address) ON CONFLICT REPLACE,
    FOREIGN KEY (game_id) REFERENCES game(id)
);

create table if not exists global_leaderboard(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_wallet_address TEXT UNIQUE NOT NULL,
  frags INTEGER NOT NULL DEFAULT 0,
  deaths INTEGER NOT NULL DEFAULT 0,
  cbcoin INTEGER NOT NULL DEFAULT 0,
  tio INTEGER NOT NULL DEFAULT 0,
  war INTEGER NOT NULL DEFAULT 0,
  trunk INTEGER NOT NULL DEFAULT 0,
  rsg INTEGER NOT NULL DEFAULT 0,
  gun INTEGER NOT NULL DEFAULT 0
);
]])

OrderBy = OrderBy or {
    ["frags"] = true,
    ["deaths"] = true,
    ["cbcoin"] = true,
    ["rsg"] = true,
    ["tio"] = true,
    ["war"] = true,
    ["trunk"] = true,
    ["gun"] = true
}

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
    local stmt = db:prepare([[
        with scores(wallet, frags, deaths, cbcoin, tio, war, trunk, rsg, gun) as (
            values (?, ?, ?, ?, ?, ?, ?, ?, ?)
        )
        insert into game_leaderboard(user_wallet_address, game_id, frags, deaths, cbcoin, tio, war, trunk, rsg, gun)
        SELECT wallet, game.id,
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

    local ok, bind_err = pcall(stmt.bind_values, stmt, wallet,
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
        insert into global_leaderboard(user_wallet_address, frags, deaths, cbcoin, tio, war, trunk, rsg, gun)
        values (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON conflict
            DO UPDATE
            SET
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

    local globalUpdateBind = globalUpdateStmt:bind_values(wallet,
            data.kills.frags or 0, data.kills.deaths or 0,
            data.tokens.cbcoin or 0, data.tokens.tio or 0, data.tokens.war or 0, data.tokens.trunk or 0,
            data.tokens.rsg or 0, data.tokens.gun or 0)
    if not globalUpdateBind then
        error("Binding update global failure: " .. db:errcode() .. " " .. db:errmsg())
    end

    executeStatement(globalUpdateStmt, "Updating global score ")
end


local function readGlobalScore(orderBy, limit, offset)
    local scoreResult = {}
    local stmt = db:prepare(string.format([[
        SELECT * FROM global_leaderboard ORDER BY %s DESC LIMIT ? OFFSET ?
    ]], orderBy))
    if not stmt then
        error(db:errmsg())
    end

    local bind = stmt:bind_values(limit, offset)
    if not bind then
        error(db:errmsg())
    end


    for row in stmt:nrows("") do
      table.insert(scoreResult, {
        wallet = row.user_wallet_address,
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

local function readGameScore(gameProcessId, orderBy, limit, offset)
    local scoreResult = {}
    local stmt = db:prepare(string.format([[
        SELECT *
        FROM game_leaderboard
        JOIN game g on game_leaderboard.game_id = g.id
        WHERE g.ao_process_id = ?
        ORDER BY %s DESC LIMIT ? OFFSET ?
    ]], orderBy))
    stmt:bind_values(gameProcessId, limit, offset)


    for row in stmt:nrows("") do
      table.insert(scoreResult, row)
    end
    stmt:finalize()

    return scoreResult
end

function executeStatement(stmt, name)
    local step_result, step_err = stmt:step()
    if step_result ~= sqlite3.DONE then
        stmt:finalize()
        error(name .. " error executing statement: " .. (step_err or "Unknown error"))
    end
end



Handlers.add("addGameScores", "AddGameScores", function (msg)
--[[
If the Owner is different than the From tag
it means that the message is from process and ao authorities step in.

Otherwise the message is accepted if it comes from the process creator.
--]]
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
  local limit = msg.Tags.Limit or 10
  local offset = msg.Tags.Offset or 0
  local orderBy = 'cbcoin'
  if msg.Tags.OrderBy and OrderBy[msg.Tags.OrderBy] then
    orderBy = msg.Tags.OrderBy
  end
  local scoresResult = readGlobalScore(orderBy, limit, offset)
  local resultEncoded = json.encode(scoresResult)
  print(resultEncoded)
  msg.reply({ Data = resultEncoded })
end)

Handlers.add("gameScores", "GameScores", function (msg)
  if not msg.Tags.GameProcessId then
    msg.reply({
      Action = 'Release-Error',
      ['Message-Id'] = msg.Id,
      Error = 'You need to provide the game process id '
    })
    return
  end
  local gameProcessId = msg.Tags.GameProcessId

  local playerScores = json.decode(msg.Data)
  local limit = msg.Tags.Limit or 10
  local offset = msg.Tags.Offset or 0
  local orderBy = 'cbcoin'
  if msg.Tags.OrderBy and OrderBy[msg.Tags.OrderBy] then
    orderBy = msg.Tags.OrderBy
  end
  local scoresResult = readGameScore(gameProcessId, orderBy, limit, offset)
  local resultEncoded = json.encode(scoresResult)
  print(resultEncoded)
  msg.reply({ Data = resultEncoded })
end)

