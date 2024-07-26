import Const, { MAX_MSG_LENGTH, MIN_MSG_LENGTH } from '../common/const.mjs';
import { serverConnection } from '../lib/serverConnection.js';
import { chatSceneKey } from '../config/config.js';
import { trimString } from '../utils/utils.js';

const defaultStyle = {
  fontFamily: '"Press Start 2P"',
  fontSize: '18px',
  textTransform: 'uppercase',
  color: 'white',
};

export default class ChatScene extends Phaser.Scene {
  messagesQueue;
  userName;

  constructor() {
    super(chatSceneKey);
  }

  init(data) {
    console.log('Chat Scene - 1. Init', data);
    this.mainScene = this.scene.get('main-scene');
    this.userName = data.userName;
    this.messagesQueue = [];
    this.processId = window.warpAO.chatProcessId();
  }

  preload() {
    console.log('Chat Scene - 2. Preload');
  }

  async create() {
    console.log('Chats Scene - 3. Create');
    this.server = serverConnection.chat;
    this.server.subscribe(this);
    this.server.send({ cmd: Const.Command.join, userName: this.userName });

    const chatBoxId = 'chat-messages-box';
    const chatBox = this.addChatBox(chatBoxId);
    this.chatBoxDiv = this.add.dom(100, 100 + chatBox.width, chatBox);
    this.removeFocusOnOutsideClick(chatBoxId);
  }

  handleMessage(response) {
    let newMsgs = response.messages;
    if (this.messagesQueue.length) {
      const lastMsg = this.messagesQueue[this.messagesQueue.length - 1];
      newMsgs = newMsgs.filter((m) => m.nonce > lastMsg.nonce);
    }
    this.messagesQueue.push(...newMsgs);
    /*if (this.messagesQueue.length > 10) {
      this.messagesQueue.splice(0, this.messagesQueue.length - 10);
    }*/
    const chatLogs = document.getElementById('chat-msg-logs');
    chatLogs.innerHTML = this.messagesFormatted();
    chatLogs.scrollTop = chatLogs.scrollHeight;
  }

  addChatBox(id) {
    const resultDiv = document.createElement('div');
    const input = document.createElement('textarea');
    input.style = `outline: none; width: 300px;`;
    input.addEventListener('keyup', this.sendMessage.bind(this));
    input.onfocus = () => {
      this.mainScene.input.keyboard.disableGlobalCapture();
      this.mainScene.input.keyboard.enabled = false;
    };
    input.setAttribute('maxlength', '' + MAX_MSG_LENGTH);
    input.onblur = () => {
      this.mainScene.input.keyboard.enableGlobalCapture();
      this.mainScene.input.keyboard.enabled = true;
    };
    resultDiv.id = id;
    resultDiv.style = ` width: 300px; height: 200px;
      border: 0; outline: none;
      background-color: #fcee09;
      position: absolute;
      right: 0px;
      font-size: 0.5rem;`;

    resultDiv.innerHTML = `
    <div style="font-family: 'Press Start 2P'; position: relative; height: 100%">
    <div style='margin: 10px 20px 5px 20px'>CHAT MESSAGES <a style="color: black;" target="_blank" href='https://www.ao.link/#/entity/${this.processId}'>${trimString(this.processId)}</a></div>
    <div id="chat-msg-logs" style="height: 165px;
    overflow-y: auto;
    margin-bottom: 10px;">${this.messagesFormatted()}</div>
    <div class="msg-input" style="position: absolute;"></div>
    </div>
    `;
    resultDiv.getElementsByClassName('msg-input')[0].appendChild(input);
    return resultDiv;
  }

  async sendMessage(e) {
    e.stopImmediatePropagation();
    if (e.code === 'Enter') {
      //checks whether the pressed key is "Enter"
      const text = e.target.value;
      console.log(text);
      console.log(text.length);
      if (!text || text.length < MIN_MSG_LENGTH || !text.replace(/\s/g, '').length) {
        return;
      }
      await this.server.send({ cmd: Const.Command.msg, msg: text });
      e.target.value = '';
      document.activeElement.blur();
    }
    if (e.code === 'Escape') {
      document.activeElement.blur();
    }
  }

  messagesFormatted() {
    if (this.messagesQueue) {
      return this.messagesQueue.map(this.addDisplayName).map(this.formatMessage).join('');
    } else {
      return '';
    }
  }

  formatMessage(i) {
    return `
      <div style='margin: 9px 20px 0 20px'><span style='display: inline-block; width: 80px; text-transform: uppercase;'>${i.displayName}</span>
      ${i.msg}
      </div>`;
  }

  addDisplayName(i) {
    if (i.userName) {
      i.displayName = i.userName.length > 9 ? trimString(i.userName, 7, 2, 0) : i.userName;
    } else {
      i.displayName = trimString(i.from);
    }
    return i;
  }

  removeFocusOnOutsideClick(id) {
    const chatBoxEl = document.getElementById(id);
    document.addEventListener('click', (e) => {
      if (!chatBoxEl.contains(e.target)) {
        document.activeElement.blur();
      }
    });
  }
}
