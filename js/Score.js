import Text from './Text.js'

export default class Score extends Text {
  scoreValue
  constructor(scene, x, y, initScore = '') {
    super(scene, x, y, `Move: ${initScore}`)
    scene.add.existing(this)
    this.scoreValue = initScore
  }

  changeValue(value) {
    this.scoreValue = value
    this.setText(`Move: ${this.scoreValue}`)
  }
  //   changeValue(operation, value) {
  //     switch (operation) {
  //       case 'increase':
  //         this.scoreValue += value;
  //         break;
  //       case 'decrease':
  //         this.scoreValue -= value;
  //         break;
  //       case 'setValue':
  //         this.scoreValue = value;
  //         break;
  //       default:
  //         break;
  //     }
  //     this.setText(`Score: ${this.scoreValue}`);
  //   }

  getValue() {
    return this.scoreValue
  }
}
