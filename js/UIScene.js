import Score from './Score.js';
import Dom from './DOMElement.js';
import EVENTS_NAME from './const.js';

export default class UIScene extends Phaser.Scene {
  score;
  constructor() {
    super('ui-scene');
  }
  create() {
    const dom = new Dom(this, 0, 0);
    let form = `
    <input type="text" name="field" placeholder="Enter value" style="font-size: 12px">
    <input type="button" name="playButton" value="Enter" style="font-size: 12px">
    `;

    const element = dom.createFromHTML(form);
    element.addListener('click');

    this.initListeners();

    element.on('click', (event) => {
      if (event.target.name === 'playButton') {
        const inputText = element.getChildByName('field');

        //  Have they entered anything?
        if (inputText.value !== '') {
          console.log(inputText.value);
          console.log(this);
          this.game.events.emit(EVENTS_NAME.currentMove, inputText.value);

          //   //  Turn off the click events
          //   this.removeListener('click');

          //   //  Hide the login element
          //   this.setVisible(false);

          //   //  Populate the text with whatever they typed in
          //   text.setText(`Welcome ${inputText.value}`);
        } else {
          //  Flash the prompt
        }
      }
    });

    this.score = new Score(this, 20, 20, 'test');
  }

  initListeners() {
    console.log('initializing events');
    this.game.events.on(
      EVENTS_NAME.currentMove,
      (value) => this.score.changeValue(value),
      this
    );
  }
}
