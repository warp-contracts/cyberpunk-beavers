import Const from "../common/const.mjs";

const MAX_MSG_LENGTH = 280; // twitter..
const LAST_MESSAGES_TO_RETURN = 10;

export function handle(state, message) {
  const actionTagValue = message.Tags.find((t) => t.name === 'Action').value;
  const action = JSON.parse(actionTagValue);
  action.walletAddress = message.Owner;
  console.log('Le Chat Noir process');
  if (!state.messages) {
    state = Object.assign(state, {messages: []});
  }

  switch (action.cmd) {
    case 'msg':
      const msg = action.msg;
      if (msg.length > MAX_MSG_LENGTH) {
        throw new ProcessError("Message too long");
      }
      state.messages.push({
        from: action.walletAddress,
        nick: action.nick,
        clientTs: action.clientTs,
        nonce: message.Nonce,
        msg
      });
      ao.result({
        cmd: Const.Command.msg,
        messages: state.messages.slice(Math.max(state.messages.length - LAST_MESSAGES_TO_RETURN, 0))
      });
      break;
    case 'join':
      ao.result({
        cmd: Const.Command.join,
        messages: state.messages.slice(Math.max(state.messages.length - LAST_MESSAGES_TO_RETURN * 5, 0))
      });
      break;
    default:
      throw new ProcessError(`Unknown action: ${action.cmd}`);

  }
}
