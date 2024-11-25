local bint = require('.bint')(256)

function CheckValidAddress(address)
	if not address or type(address) ~= 'string' then
		return false
	end

	return string.match(address, '^[%w%-_]+$') ~= nil and (#address == 43 or #address == 42)
end

function CheckValidAmount(data)
	return bint(data) > bint(0)
end

function Add(a,b)
    return tostring(bint(a) + bint(b))
end

function Multiply(a,b)
    return tostring(bint(a) * bint(b))
end

function Subtract(a,b)
    return tostring(bint(a) - bint(b))
end

function HandleError(args) -- Target, TransferToken, Quantity
	-- If there is a valid quantity then return the funds
	if args.TransferToken and args.Quantity and  CheckValidAmount(args.Quantity) then
		ao.send({
			Target = args.TransferToken,
			Action = 'Transfer',
			Tags = {
				Recipient = args.Target,
				Quantity = tostring(args.Quantity)
			}
		})
	end
	ao.send({ Target = args.Target, Action = args.Action, Tags = { Status = 'Error', Message = args.Message } })
end
