export class Text extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text, style) {
    super(scene, x, y, text, style);
    scene.add.existing(this);
  }

  async animateText(speedInMs = 100) {
    const target = this;
    // store original text
    const message = target.text;
    const invisibleMessage = message.replace(/[^ ]/g, ' ');
    // clear text on screen
    target.text = '';

    // mutable state for visible text
    let visibleText = '';

    // use a Promise to wait for the animation to complete
    return new Promise((resolve) => {
      const timer = target.scene.time.addEvent({
        delay: speedInMs,
        loop: true,
        callback() {
          // if all characters are visible, stop the timer
          if (target.text === message) {
            timer.destroy();
            return resolve();
          }

          // add next character to visible text
          visibleText += message[visibleText.length];

          // right pad with invisibleText
          const invisibleText = invisibleMessage.substring(visibleText.length);

          // update text on screen
          target.text = visibleText + invisibleText;
        },
      });
    });
  }

  blinkText() {
    this.scene.time.addEvent({
      delay: 500,
      startAt: 500,
      repeat: -1,
      args: [this.image],
      callback: () => {
        this.visible = !this.visible;
      },
    });
  }
}
