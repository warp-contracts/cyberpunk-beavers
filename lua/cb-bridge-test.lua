
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
Name = Name or 'TEST CyberBeaver Token Bridge'
Ticker = Ticker or 'cbTokenBridgeTest'
Logo = Logo or 'WATOlqtoEaO2IsZyUaG-en3qLxPwUnCKLu3SnEm42SY'
Owner = Owner or ao.env.Process.Owner

Tokens = {
  tio = 'h3FqYG9AVze-JFH-MQS3Rvv5golBhjnDuPDpJFEpdwE',
  trunk = '2_O3UNKze6Yuy1oaNzRAGQjqbXJyd8AprlR90QFDp98',
  war = 'Q7-XYIgAKiatIGuez3dM7eu4miqH5_USvKt6uY4bw9Y'
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

