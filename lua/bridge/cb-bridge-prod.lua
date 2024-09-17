
local bint = require('.bint')(256)
--[[
  This module implements the ao Standard Token Specification.

  Terms:
    Sender: the wallet or Process that sent the Message

  It will first initialize the internal state, and then attach handlers,
    according to the ao Standard Token Spec API:

    - Info(): return the token parameters, like Name, Ticker and Logo

    - Deployed(Process: string): stores deployed process in state

    - Transfer(Token: string): forwards transfer from internal network to ao testnet

--]]
local json = require('json')


--[[
     Initialize State

     ao.id is equal to the Process.Id
--]]
Variant = "0.0.3"

-- token should be idempotent and not change previous state updates
Name = Name or 'CyberBeaver Token Bridge'
Ticker = Ticker or 'cbTokenBridge'
Logo = Logo or 'WATOlqtoEaO2IsZyUaG-en3qLxPwUnCKLu3SnEm42SY'
Owner = Owner or ao.env.Process.Owner

Tokens = {
  tio = 'agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA',
  trunk = 'OT9qTE2467gcozb2g8R6D6N3nQS94ENcaAIJfUzHCww',
  war = 'xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10',
  gun = 'O-566VlALuKNrSQBdLOgHyYIcqT0oqeattaBk2gNS70'
}


ProcessesDeployed = {}

--[[
     Add handlers for each incoming Action defined by the ao Standard Token Specification
--]]

--[[
     Info
--]]
Handlers.add('info', Handlers.utils.hasMatchingTag('Action', 'Info'), function(msg)
  ao.send({
    Target = msg.From,
    Name = Name,
    Ticker = Ticker,
    Logo = Logo,
    Data = json.encode(ProcessesDeployed)
  })
end)

--[[
     Deployed Process
--]]
Handlers.add('deployed', Handlers.utils.hasMatchingTag('Action', 'Deployed'), function(msg)
  if msg.From ~= Owner then
    ao.send({
      Target = msg.From,
      Data = "Unauthorized" })
    return
  end

  if msg.Tags.Process == nil then
    ProcessesDeployed[msg.From] = true
  else
    ProcessesDeployed[msg.Tags.Process] = true
  end

  ao.send({
    Target = msg.From,
    Data = 'Registered'
  })
end)



--[[
     Transfer
--]]
Handlers.add('transfer', Handlers.utils.hasMatchingTag('Action', 'Transfer'), function(msg)
  if not ProcessesDeployed[msg.From] then
    ao.send({
      Target = msg.From,
      Data = "Unauthorised process" })
    return
  end

  for recipient, qty in pairs(json.decode(msg.Data).recipients) do
    ao.send({
      Target = Tokens[msg.Tags.Token],
      Recipient = recipient,
      Action = 'Transfer',
      Quantity = qty
    })
  end

  ProcessesDeployed[msg.From] = nil

end)

