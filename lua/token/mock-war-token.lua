local json = require('json')
local ao = require('ao')
local bint = require('.bint')(256)

--[[
  This module implements the ao Standard Token Specification.

  Terms:
    Sender: the wallet or Process that sent the Message

  It will first initialize the internal state, and then attach handlers,
    according to the ao Standard Token Spec API:

    - Info(): return the token parameters, like Name, Ticker, Logo, and Denomination

    - Balance(Target?: string): return the token balance of the Target. If Target is not provided, the Sender
        is assumed to be the Target

    - Balances(): return the token balance of all participants

    - Transfer(Target: string, Quantity: number): if the Sender has a sufficient balance, send the specified Quantity
        to the Target. It will also issue a Credit-Notice to the Target and a Debit-Notice to the Sender

    - Mint(Quantity: number): if the Sender matches the Process Owner, then mint the desired Quantity of tokens, adding
        them the Processes' balance

--]]
local json = require('json')

--[[
  utils helper functions to remove the bint complexity.
--]]


local utils = {
  add = function(a, b)
    return tostring(bint(a) + bint(b))
  end,
  subtract = function(a, b)
    return tostring(bint(a) - bint(b))
  end,
  toBalanceValue = function(a)
    return tostring(bint(a))
  end,
  toNumber = function(a)
    return bint.tonumber(a)
  end
}

ao.authorities = {"f70fYdp_r-oJ_EApckTYQ6d66KaEScQLGTllu98QgXg", "fcoN_xJeisVsPXA-trzVAuIiqO3ydLQxM-L4XbrQKzY", "jnioZFibZSCcV8o-HkBXYPYEYNib4tqfexP0kCBXX_M"}



--[[
     Initialize State

     ao.id is equal to the Process.Id
--]]
Variant = "0.0.3"

-- token should be idempotent and not change previous state updates
if not BridgeProcessId then BridgeProcessId = '' end -- BridgeProcessId must be cross chain bridge main process id

Denomination = Denomination or 12
Balances = Balances or { [ao.id] = utils.toBalanceValue(10000 * 10 ^ Denomination) }
TotalSupply = TotalSupply or utils.toBalanceValue(10000 * 10 ^ Denomination)
if not FeeRecipient then FeeRecipient = 'jmGGoJaDYDTx4OCM7MP-7l-VLIM4ZEGCS0cHPsSmiNE' end
Owner = Owner or ao.env.Process.Owner

Name = Name or 'MockWa'

Ticker = Ticker or 'MOCKWA'

if not MintFee then MintFee = '0' end -- mint fee

if not MinBurnAmt then MinBurnAmt = '100000000000' end -- default 0.1AR

Logo = Logo or 'SBCCXwwecBlDqRLUjb8dYABExTJXLieawf7m2aBJ-KY'

--[[
     Add handlers for each incoming Action defined by the ao Standard Token Specification
--]]

--[[
     Info
--]]
Handlers.add('info', Handlers.utils.hasMatchingTag('Action', 'Info'), function(msg)
  ao.send(
      { Target = msg.From, Tags = { Name = Name, Ticker = Ticker, Logo = Logo, Denomination = tostring(Denomination), MinBurnAmt = MinBurnAmt, BurnFee = Fee, MintFee = MintFee, FeeRecipient = FeeRecipient,
                                    TotalSupply = TotalSupply, Owner = Owner, HolderNum = tostring(getTableLength(Balances)) } })
end)

--[[
     Balance
--]]
Handlers.add('balance', Handlers.utils.hasMatchingTag('Action', 'Balance'), function(msg)
  local bal = '0'

  -- If not Recipient is provided, then return the Senders balance
  if (msg.Tags.Recipient and Balances[msg.Tags.Recipient]) then
    bal = Balances[msg.Tags.Recipient]
  elseif Balances[msg.From] then
    bal = Balances[msg.From]
  end

  ao.send({
     Target = msg.From,
     Tags = {
      Action = 'Balance-Notice',
      Balance = bal,
      Ticker = Ticker,
      Account = msg.Tags.Recipient or msg.From
      },
     Data = bal
  })
end)

--[[
     Balances
--]]
Handlers.add('balances', Handlers.utils.hasMatchingTag('Action', 'Balances'),
             function(msg) ao.send({ Target = msg.From, Data = json.encode(Balances), Tags = {Action = 'Balances-Notice', Ticker = Ticker}}) end)


--[[
     Transfer
--]]
Handlers.add('transfer', Handlers.utils.hasMatchingTag('Action', 'Transfer'), function(msg)
  assert(type(msg.Tags.Recipient) == 'string', 'Recipient is required!')
  assert(type(msg.Tags.Quantity) == 'string', 'Quantity is required!')
  assert(bint.__lt(0, bint(msg.Tags.Quantity)), 'Quantity must be greater than 0')
  assert(isPositiveInteger(msg.Tags.Quantity) == true, 'Quantity must be integer!')

  if not Balances[msg.From] then Balances[msg.From] = "0" end

  if not Balances[msg.Tags.Recipient] then Balances[msg.Tags.Recipient] = "0" end

  local qty = bint(msg.Tags.Quantity)
  local balance = bint(Balances[msg.From])

   if bint.__le(qty, balance) then
    Balances[msg.From] = tostring(bint.__sub(balance, qty))
    Balances[msg.Tags.Recipient] = tostring(bint.__add(Balances[msg.Tags.Recipient], qty))

    --[[
      Only Send the notifications to the Sender and Recipient
      if the Cast tag is not set on the Transfer message
    --]]
    if not msg.Tags.Cast then
           -- Debit-Notice message template, that is sent to the Sender of the transfer
           local debitNotice = {
             Target = msg.From,
             Action = 'Debit-Notice',
             Recipient = msg.Recipient,
             Quantity = msg.Quantity,
             Data = Colors.gray ..
                 "You transferred " ..
                 Colors.blue .. msg.Quantity .. Colors.gray .. " to " .. Colors.green .. msg.Recipient .. Colors.reset
           }
           -- Credit-Notice message template, that is sent to the Recipient of the transfer
           local creditNotice = {
             Target = msg.Recipient,
             Action = 'Credit-Notice',
             Sender = msg.From,
             Quantity = msg.Quantity,
             Data = Colors.gray ..
                 "You received " ..
                 Colors.blue .. msg.Quantity .. Colors.gray .. " from " .. Colors.green .. msg.From .. Colors.reset
           }

           -- Add forwarded tags to the credit and debit notice messages
           for tagName, tagValue in pairs(msg) do
             -- Tags beginning with "X-" are forwarded
             if string.sub(tagName, 1, 2) == "X-" then
               debitNotice[tagName] = tagValue
               creditNotice[tagName] = tagValue
             end
           end

           -- Send Debit-Notice and Credit-Notice
           ao.send(debitNotice)
           ao.send(creditNotice)
    end
  else
    ao.send({
      Target = msg.From,
      Tags = { Action = 'Transfer-Error', ['Message-Id'] = msg.Id, Error = 'Insufficient Balance!' }
    })
  end
end)




function isPositiveInteger(str)
  local num = tonumber(str)
  return num and num > 0 and math.floor(num) == num
end

function getTableLength(tbl)
  local count = 0
  for _ in pairs(tbl) do
    count = count + 1
  end
  return count
end

