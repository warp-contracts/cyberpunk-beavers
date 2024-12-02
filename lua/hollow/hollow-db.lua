local sqlite3 = require("lsqlite3")

function ExecuteStatement(stmt, name)
    local step_result, step_err = stmt:step()
    if step_result ~= sqlite3.DONE then
        stmt:finalize()
        error(name .. " error executing statement: " .. (step_err or "Unknown error") .. " step_result: " .. step_result)
    end
end

function InsertOrder(wallet_address, timestamp, item_type, item_qty, payment)
    local stmt = db:prepare([[
        insert into orders(wallet_address, timestamp, item_type, item_qty, payment)
        values (?, ?, ?, ?, ?);
    ]])
    if not stmt then
        error("Preparing insert order failure: " .. db:errcode() .. " " .. db:errmsg())
    end
    local stmtBind = stmt:bind_values(wallet_address, timestamp, item_type, item_qty, payment)
    if not stmtBind then
        error("Binding insert order failure: " .. db:errcode() .. " " .. db:errmsg())
    end

    ExecuteStatement(stmt, "Inserting order")
end

function ReadOrders(limit, offset, wallet_address)
    local readOrdersResult = {}

	local sql = [[
        SELECT *
        FROM orders
	]]

	local valuesToBind = {}

	if wallet_address then
		sql = sql .. ' WHERE wallet_address = ?'
		table.insert(valuesToBind, wallet_address)
	end

	sql = sql .. ' ORDER BY timestamp DESC LIMIT ? OFFSET ?;'
	table.insert(valuesToBind, limit)
	table.insert(valuesToBind, offset)
    local stmt, err_parse = db:prepare(sql)
	if not stmt then
		error("Error parsing SQL statement: " .. (err_parse or "Unknown error"))
	end

	local ok, err_bind = pcall(function ()
		stmt:bind_values(table.unpack(valuesToBind))
	end)
	if not ok then
		stmt:finalize()
		error("Error binding values: " .. (err_bind or "Unknown error"))
	end

	local exec_ok, err_exec = pcall(function ()
		for row in stmt:nrows("") do
			table.insert(readOrdersResult, row)
		  end
	end)
	if not exec_ok then
		stmt:finalize()
		error("Error executing query: " .. (err_exec or "Unknown error"))
	end

	stmt:finalize()
    return readOrdersResult
end