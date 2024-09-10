
local json = require('json')

PendingTransfers = PendingTransfers or {}


--[[
    Schedule Transfer
--]]
Handlers.add('scheduleTransfer', "ScheduleTransfer", function(msg)

  if msg.From == msg.Owner then
    msg.reply({
      Action = 'Schedule-Error',
      ['Message-Id'] = msg.Id,
      Error = 'From Process required'
    })
    return
  end

  if not msg.Tags.HubProcessId then
    msg.reply({
      Action = 'Schedule-Error',
      ['Message-Id'] = msg.Id,
      Ownerr = msg.Owner,
      Fromoo = msg.From,
      Error = 'You need to provide the hub process id '
    })
    return
  end
  local hubId = msg.Tags.HubProcessId

  PendingTransfers[hubId] = PendingTransfers[hubId] or { [msg.From] = {} }
  PendingTransfers[hubId][msg.From] = json.decode(msg.Data)

  ao.send({
    Target = msg.Owner,
    Action = 'Scheduled',
    ['Message-Id'] = msg.Id,
    Ownerr = msg.Owner,
    Fromoo = msg.From,
    Data = json.encode(PendingTransfers[hubId])
  })
end)


--[[
    Pending Transfers
--]]
Handlers.add('pendingTransfers', "PendingTransfers", function(msg)

  if msg.Tags.HubProcessId then
    msg.reply({
      Action = 'Pending',
      ['Message-Id'] = msg.Id,
      Data = json.encode(PendingTransfers[msg.Tags.HubProcessId])
    })
    return
  end

  msg.reply({
    Action = 'Pending',
    ['Message-Id'] = msg.Id,
    Data = json.encode(PendingTransfers)
  })
end)

--[[
    Release Pending
--]]
Handlers.add('releasePending', "ReleasePending", function(msg)

  if not (msg.Owner == Owner) then
    msg.reply({
      Action = 'Release-Error',
      ['Message-Id'] = msg.Id,
      Error = 'Unauthorised ' .. msg.Owner
    })
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
  local hubId = msg.Tags.HubProcessId

  if not PendingTransfers[hubId] then
    msg.reply({
      Action = 'Release-Error',
      ['Message-Id'] = msg.Id,
      Error = 'Nothing pending for ' .. hubId .. ' or already released'
    })
    return
  end

  if msg.Tags.GameProcessId then
    local gameId = msg.Tags.GameProcessId
    for tokenType, processTransfers in pairs(PendingTransfers[hubId][gameId]) do
      for recipient, qty in pairs(processTransfers) do
          ao.send({
            Target = Tokens[tokenType],
            Recipient = recipient,
            Action = 'Transfer',
            Quantity = qty
          })
      end
    end
    PendingTransfers[hubId][gameId] = nil
    return
  end

  for processId, processData in pairs(PendingTransfers[hubId]) do
    for tokenType, processTransfers in pairs(processData) do
      for recipient, qty in pairs(processTransfers) do
          ao.send({
            Target = Tokens[tokenType],
            Recipient = recipient,
            Action = 'Transfer',
            Quantity = qty
          })
      end
    end
  end

  PendingTransfers[hubId] = nil
end)
