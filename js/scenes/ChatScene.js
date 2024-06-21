import Const from '../common/const.mjs';
import {serverConnectionChat} from "../lib/serverConnection.js";

const defaultStyle = {
  fontFamily: '"Press Start 2P"',
  fontSize: '18px',
  textTransform: 'uppercase',
  color: 'white',
};

export default class ChatScene extends Phaser.Scene {
  messagesQueue;

  constructor() {
    super('chat-scene');
  }

  init() {
    console.log('Chat Scene - 1. Init');
    this.mainScene = this.scene.get('main-scene');
    this.messagesQueue = [];
    this.processId = window.warpAO.chatProcessId();
  }

  preload() {
    console.log('Chat Scene - 2. Preload');
  }

  async create() {
    console.log('Chats Scene - 3. Create');
    this.server = serverConnectionChat;
    this.server.subscribe(this);
    this.server.send({cmd: Const.Command.join});

    const chatBox = this.addChatBox();
    this.chatBoxDiv = this.add.dom(100, 100 + chatBox.width, chatBox);
  }

  handleMessage(response) {
    let newMsgs = response.messages;
    if (this.messagesQueue.length) {
      const lastMsg = this.messagesQueue[this.messagesQueue.length - 1];
      newMsgs = newMsgs.filter(m => m.nonce > lastMsg.nonce);
    }
    this.messagesQueue.push(...newMsgs);
    /*if (this.messagesQueue.length > 10) {
      this.messagesQueue.splice(0, this.messagesQueue.length - 10);
    }*/
    const chatLogs = document.getElementById('chat-msg-logs');
    chatLogs.innerHTML = this.messagesFormatted();
    chatLogs.scrollTop = chatLogs.scrollHeight;
  }

  addChatBox() {
    const resultDiv = document.createElement('div');
    const input = document.createElement('textarea');
    input.style = `outline: none; width: 350px;`;
    input.addEventListener('keyup', this.sendMessage.bind(this));
    input.onfocus = () => this.mainScene.input.keyboard.disableGlobalCapture();
    input.onblur = () => this.mainScene.input.keyboard.enableGlobalCapture();
    resultDiv.id = 'chat-messages-box';
    resultDiv.style = ` width: 400px; height: 400px;
      border: 0; outline: none;
      background-color: #fcee09;
      position: absolute;
      right: 0px;
      font-size: 0.5rem;`;

    resultDiv.innerHTML = `
    <div style="font-family: 'Press Start 2P'; position: relative; height: 100%">
    <div style='margin: 10px 20px 5px 20px'>CHAT MESSAGES <a style="color: black;" target="_blank" href='https://www.ao.link/#/entity/${this.processId}'>${truncateTxId(this.processId, 3)}</a></div>
    <div id="chat-msg-logs" style="height: 320px;
    overflow: scroll;
    margin-bottom: 10px;">${this.messagesFormatted()}</div>
    <div class="msg-input" style="
        position: absolute;
        left: 20px;"></div>
    </div>
    `;
    resultDiv.getElementsByClassName('msg-input')[0].appendChild(input);
    return resultDiv;
  }

  async sendMessage(e) {
    console.log(e);
    e.stopImmediatePropagation();
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
      const text = e.target.value;
      if (!text || text.length == 0) {
        return;
      }
      console.log(text);
      await this.server.send({cmd: Const.Command.msg, msg: text});
      e.target.value = "";
    }
    if (e.code === "Escape") {
      document.activeElement.blur();
    }
  }

  messagesFormatted() {
    if (this.messagesQueue) {
      return this.messagesQueue.map(this.formatMessage).join('');
    } else {
      return '';
    }
  }

  formatMessage(i) {
    return `
      <div style='margin: 9px 20px 0 20px'><span style='display: inline-block; width: 80px; text-transform: uppercase;'>${truncateTxId(i.from, 3)}</span>
      ${i.msg}
      </div>`;
  }
}

function truncateTxId(txId, n) {
  if (!txId) {
    return '';
  }
  return `${txId.substr(0, n) + '...' + txId.substr(txId.length - n)}`;
};
