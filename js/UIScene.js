import Score from './Score.js';
import Dom from './DOMElement.js';
import EVENTS_NAME from './common/const.mjs';

export default class UIScene extends Phaser.Scene {
    score;

    constructor() {
        super('ui-scene');
    }

    create() {
        const dom = new Dom(this, 0, 0);
        let form = `<input type="button" name="playButton" value="Enter" style="font-size: 12px">`;

        const element = dom.createFromHTML(form);
        element.addListener('click');

        this.initListeners();

        element.on('click', (event) => {
            if (event.target.name === 'playButton') {
                console.log(this);
                this.game.events.emit(EVENTS_NAME.currentMove, 'input');
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
