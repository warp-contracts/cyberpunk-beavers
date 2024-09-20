
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
    cb_coins INTEGER NOT NULL DEFAULT 0,
    tio INTEGER NOT NULL DEFAULT 0,
    war INTEGER NOT NULL DEFAULT 0,
    trunk INTEGER NOT NULL DEFAULT 0,
    UNIQUE (game_id, user_wallet_address) ON CONFLICT REPLACE,
    FOREIGN KEY (game_id) REFERENCES game(id)
);

create table if not exists global_leaderboard(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_wallet_address TEXT UNIQUE NOT NULL,
  frags INTEGER NOT NULL DEFAULT 0,
  deaths INTEGER NOT NULL DEFAULT 0,
  cb_coins INTEGER NOT NULL DEFAULT 0,
  tio INTEGER NOT NULL DEFAULT 0,
  war INTEGER NOT NULL DEFAULT 0,
  trunk INTEGER NOT NULL DEFAULT 0
);
]])


local function insertScores(hubProcessId, gameProcessId, playerScores)
    print("print insertScores hub")
    local hubSql = string.format("insert or ignore into game_hub_session(ao_process_id) VALUES ('%s')", hubProcessId)
    db:exec(hubSql)

    print("print insertScores game")
    db:exec(string.format([[
        with new_game(process_id) as (values ('%s'))
        insert or ignore into game(ao_process_id, game_hub_session_id)
        select process_id, game_hub_session.id
        from new_game
            join game_hub_session on game_hub_session.ao_process_id = '%s'
    ]], gameProcessId, hubProcessId))

    for wallet, data in pairs(playerScores) do
        local gameScoresResult = insertSingleGameScores(gameProcessId, wallet, data)
        print("insertSingleGameScores finished ")
        if gameScoresResult ~= nil then
            print("result " .. gameScoresResult)
        end

        local res = db:exec(string.format([[
        insert into global_leaderboard(user_wallet_address, cb_coins, tio, war, trunk, frags, deaths)
        values ('%s', %d, %d, %d, %d, %d, %d)
        ON conflict
            DO UPDATE
            SET
                cb_coins = cb_coins + excluded.cb_coins,
                tio = tio + excluded.tio,
                war = war + excluded.war,
                war = trunk + excluded.trunk,
                war = frags + excluded.frags,
                war = deaths + excluded.deaths;
        ]], wallet, data.tokens.cbcoin or 0, data.tokens.tio or 0, data.tokens.war or 0, data.tokens.trunk or 0,
                data.kills.frags or 0, data.kills.deaths or 0))
        print("Err: " .. db:errmsg())
        print(string.format("wallet %s cb number %d", wallet, data.tokens.cbcoin))
        print(res)
    end
end



function insertSingleGameScores(game_process_id, wallet, data)
    local tokens = data.tokens
    local kills = data.kills
    local stmt = db:prepare([[
        with scores(wallet, cb_coins, tio, war, trunk, frags, deaths) as (
            values (?, ?, ?, ?, ?, ?, ?)
        )
        insert into game_leaderboard(user_wallet_address, game_id, cb_coins, tio, war, trunk, frags, deaths)
        SELECT wallet, game.id,
               coalesce(cb_coins, 0),
               coalesce(tio, 0),
               coalesce(war, 0),
               coalesce(trunk, 0),
               coalesce(frags, 0),
               coalesce(deaths, 0)
        from scores
            cross join game on ao_process_id = ?;
    ]])
    if not stmt then
        return "Error preparing statement: " .. (db:errmsg() or "Unknown error")
    end

    local ok, bind_err = pcall(stmt.bind_values, stmt, wallet,
        tokens.cbcoin or 0, tokens.tio or 0, tokens.war or 0, tokens.trunk or 0,
        kills.frags or 0, kills.deaths or 0,
        game_process_id)
    if not ok then
        stmt:finalize()
        return "Error binding values: " .. (bind_err or "Unknown error")
    end

    local step_result, step_err = stmt:step()
    if step_result ~= sqlite3.DONE then
        stmt:finalize()
        return "Error executing statement: " .. (step_err or "Unknown error")
    end

    stmt:finalize()
    return nil
end



local function readGlobalScore(limit, offset)
    local scoreResult = {}
    local stmt = db:prepare([[
        SELECT * FROM global_leaderboard ORDER BY cb_coins DESC LIMIT ? OFFSET ?
    ]])
    stmt:bind_values(limit, offset)

    for row in stmt:nrows("") do
      table.insert(scoreResult, {
        wallet = row.user_wallet_address,
        cbcoin = row.cb_coins,
        tio = row.tio,
        war = row.war,
        trunk = row.trunk,
        frags = row.frags,
        deaths = row.deaths,
      })
    end
    stmt:finalize()

    return scoreResult
end

local function readGameScore(gameProcessId, limit, offset)
    local scoreResult = {}
    local stmt = db:prepare([[
        SELECT *
        FROM game_leaderboard
        JOIN game g on game_leaderboard.game_id = g.id
        WHERE g.ao_process_id = ?
        ORDER BY cb_coins DESC LIMIT ? OFFSET ?
    ]])
    stmt:bind_values(gameProcessId, limit, offset)

    for row in stmt:nrows("") do
      table.insert(scoreResult, row)
    end
    stmt:finalize()

    return scoreResult
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
  local scoresResult = readGlobalScore(limit, offset)
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
  local scoresResult = readGameScore(gameProcessId, limit, offset)
  local resultEncoded = json.encode(scoresResult)
  print(resultEncoded)
  msg.reply({ Data = resultEncoded })
end)

