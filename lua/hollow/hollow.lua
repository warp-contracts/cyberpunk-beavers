local bint = require('.bint')(256)
local sqlite3 = require("lsqlite3")

Owner = Owner or ao.env.Process.Owner

Items = Items or {}
Balances = Balances or {}

ao.authorities = {"fcoN_xJeisVsPXA-trzVAuIiqO3ydLQxM-L4XbrQKzY", "jmGGoJaDYDTx4OCM7MP-7l-VLIM4ZEGCS0cHPsSmiNE"}

--
-- WRITE
-- 1. Add-Item - add new item to the hollow or change price/qty
-- 3. Credit-Notice - create order of the items
-- READ
-- 1. Read-Item - read item with specific name
-- 2. Read-Hollow - read all the items in the hollow
-- 3. Read-Balance - read player's items balance
-- 4. Read-Orders - read orders from db
--

-- Open the database
db = db or sqlite3.open_memory()

-- init db
db:exec([[
create table if not exists orders(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    wallet_address TEXT NOT NULL,
	timestamp INTEGER NOT NULL,
	item_type TEXT NOT NULL,
	item_qty INTEGER NOT NULL,
	payment INTEGER NOT NULL
);
]])

Handlers.add('Credit-Notice', Handlers.utils.hasMatchingTag('Action', 'Credit-Notice'), function(msg)
	local data = {
		Sender = msg.Tags.Sender,
		Quantity = msg.Tags.Quantity,
	}

	-- If msg.From is different than msg.Owner - authorities are taken into account
	if msg.From == msg.Owner and msg.Owner ~= Owner then
		HandleError({
			Target = msg.From,
			Action = 'Create-Order-Error',
			Message = msg.Owner .. ' unauthorized.',
			Quantity = data.Quantity,
			TransferToken = data.Sender,
		})
        return
      end

	-- Check if all transfer fields are present
	if not data.Sender or not data.Quantity then
		HandleError({
			Target = msg.From,
			Action = 'Input-Error',
			Message = 'Invalid arguments, required { Sender, Quantity }.',
			Quantity = nil,
			TransferToken = nil,
		})
		return
	end

	-- Check if sender is a valid address
	if not CheckValidAddress(data.Sender) then
		HandleError({
			Target = msg.From,
			Action = 'Validation-Error',
			Message = 'Sender must be a valid address.',
			Quantity = nil,
			TransferToken = nil,
		})
		return
	end

	-- Check if quantity is a valid integer greater than zero
	if not CheckValidAmount(data.Quantity) then
		HandleError({
			Target = msg.From,
			Action = 'Validation-Error',
			Message = 'Quantity must be an integer greater than zero.',
			Quantity = nil,
			TransferToken = nil,
		})
		return
	end

	-- If Order-Action then create the order
	if (Handlers.utils.hasMatchingTag('Action', 'X-Order-Action') and msg.Tags['X-Order-Action'] == 'Create-Order') then
		local orderArgs = {
			orderId = msg.Id,
			token = msg.From,
			item = msg.Tags.Item,
			itemQuantity = msg.Tags['Item-Quantity'],
			sender = data.Sender,
			quantity = data.Quantity,
			timestamp = msg.Timestamp,
			blockheight = msg['Block-Height']
		}

		-- check if item is passed
		if not orderArgs.item or not orderArgs.itemQuantity then
			HandleError({
				Target = orderArgs.sender,
				Action = 'Input-Error',
				Message = 'Invalid arguments, required { Item, Item-Quantity }.',
				Quantity = orderArgs.quantity,
				TransferToken = msg.From,
			})
			return
		end

		-- check if item is present in the hollow
		if not Items[orderArgs.item] then
			HandleError({
				Target = orderArgs.sender,
				Action = 'Create-Order-Error',
				Message = 'Item not found ' .. orderArgs.item,
				Quantity = orderArgs.quantity,
				TransferToken = msg.From,
			})
			return
		end

		-- check if there are enough items in the hollow
		if  ToNumber(Items[orderArgs.item].Quantity) < ToNumber(orderArgs.itemQuantity) then
			HandleError({
				Target = orderArgs.sender,
				Action = 'Create-Order-Error',
				Message = 'Not enough items in the hollow, required: ' .. orderArgs.itemQuantity .. ' had: ' .. Items[orderArgs.item].Quantity,
				Quantity = orderArgs.quantity,
				TransferToken = msg.From,
			})
			return
		end

		-- check if price of ordered items alligns with quantity of the Credit-Notice
		local totalItemPrice = Multiply(orderArgs.itemQuantity, Items[orderArgs.item].Price)

		if  ToNumber(totalItemPrice) <= ToNumber(orderArgs.quantity) then
			if not Balances[orderArgs.sender] then Balances[orderArgs.sender] = {} end
			if not Balances[orderArgs.sender][orderArgs.item] then
				Balances[orderArgs.sender][orderArgs.item] = '0'
			end

			Items[orderArgs.item].Quantity = Subtract(Items[orderArgs.item].Quantity, orderArgs.itemQuantity)
			Balances[orderArgs.sender][orderArgs.item] = Add(Balances[orderArgs.sender][orderArgs.item], orderArgs.itemQuantity)
			ao.send({
				Target = msg.From,
				Action = 'Create-Order-Success',
				Data = 'Successfully created order for item: ' .. orderArgs.item .. ' Qty: ' .. orderArgs.itemQuantity .. ' for price: ' .. totalItemPrice
			})


			-- return remaining token quantity to the sender
			if  ToNumber(totalItemPrice) < ToNumber(orderArgs.quantity) then
				ao.send({
					Target = msg.From,
					Action = 'Transfer',
					Tags = {
						Recipient = orderArgs.Sender,
						Quantity = tostring(Subtract(orderArgs.quantity, totalItemPrice))
					}
				})
			end
			InsertOrder(orderArgs.sender, msg.Timestamp, orderArgs.item, orderArgs.itemQuantity, totalItemPrice)
			return
		else
			HandleError({
				Target = msg.From,
				Action = 'Create-Order-Error',
				Message = 'Not enough tokens transferred, required: ' .. totalItemPrice .. ' had: ' .. orderArgs.quantity,
				Quantity = orderArgs.quantity,
				TransferToken = msg.From,
			})
			return
		end
	end
end)

Handlers.add('Add-Item', Handlers.utils.hasMatchingTag('Action', 'Add-Item'), function(msg)
    assert(type(msg.Tags.Quantity) == 'string', 'Quantity is required.')
    assert(type(msg.Tags.Item) == 'string', 'Item is required.')

	if not Items[msg.Tags.Item] then
		assert(type(msg.Tags.Price) == 'string', 'Price is required for new item.')
	end

    if msg.Owner ~= Owner then
		HandleError({
			Target = msg.From,
			Action = 'Add-Item-Error',
			Message = 'Only the Owner can add new items..',
			Quantity = nil,
			TransferToken = nil,
		})
        return
      end

    if not Items[msg.Tags.Item] then
        Items[msg.Tags.Item] = {
            Price = "0",
            Quantity = "0"
		}
        end

    Items[msg.Tags.Item].Quantity = Add(Items[msg.Tags.Item].Quantity, bint(msg.Tags.Quantity))
    if msg.Tags.Price then
		Items[msg.Tags.Item].Price = msg.Tags.Price
    end

	ao.send({
		Target = msg.From,
		Action = 'Add-Item-Success',
		Data = 'Successfully added item ' .. msg.Tags.Item .. ' Qty ' .. Items[msg.Item].Quantity .. ' Price ' .. Items[msg.Item].Price
	})
end)

Handlers.add('Read-Item', Handlers.utils.hasMatchingTag('Action', 'Read-Item'), function(msg)
    assert(type(msg.Tags.Item) == 'string', 'Item is required.')

	if not Items[msg.Tags.Item] then
		HandleError({
			Target = msg.From,
			Action = 'Item-Info-Error',
			Message = 'Item not found.',
			Quantity = nil,
			TransferToken = nil,
		})
		return
	end

	ao.send({
		Target = msg.From,
		Action = 'Item-Info',
		Data = Items[msg.Tags.Item],
	  })
end)

Handlers.add('Read-Balance', Handlers.utils.hasMatchingTag('Action', 'Read-Balance'), function(msg)
	assert(type(msg.Tags['Wallet-Address']) == 'string', 'Wallet address is required.')

	if not Balances[msg.Tags['Wallet-Address']] then
		HandleError({
			Target = msg.From,
			Action = 'Read-Balance-Error',
			Message = 'Wallet address not found in balances.',
			Quantity = nil,
			TransferToken = nil,
		})
		return
	end

	ao.send({
		Target = msg.From,
		Action = 'Read-Balance-Success',
		Data = Balances[msg.Tags['Wallet-Address']],
	  })
end)

Handlers.add('Read-Hollow', Handlers.utils.hasMatchingTag('Action', 'Read-Hollow'), function(msg)
	ao.send({
		Target = msg.From,
		Action = 'Read-Hollow-Success',
		Data = Items,
	  })
end)

Handlers.add('Read-Orders', Handlers.utils.hasMatchingTag('Action', 'Read-Orders'), function(msg)
	local limit = msg.Tags.Limit or 10
	local offset = msg.Tags.Offset or 0
	local wallet_address = msg.Tags['Wallet-Address'] or nil
	local result = ReadOrders(limit, offset, wallet_address)
	ao.send({
		Target = msg.From,
		Action = 'Read-Orders-Success',
		Data = result,
	  })
end)
