export class Scrollbar {
  constructor(scene, x, y, height, mode, child, colors) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.height = height;
    this.mode = mode;
    this.child = child;
    this.colors = colors;

    this.initScrollbar();
  }

  initScrollbar() {
    this.scene.rexUI.add
      .scrollablePanel({
        x: this.x,
        y: this.y,
        height: this.height,

        scrollMode: this.mode,

        panel: {
          child: this.child,
        },

        slider: {
          track: this.scene.rexUI.add.roundRectangle({ width: 20, radius: 0, color: this.colors.track }),
          thumb: this.scene.add.rectangle(0, 0, 20, 25, this.colors.thumb),
          hideUnscrollableSlider: true,
        },
        mouseWheelScroller: {
          focus: false,
          speed: 0.1,
        },
      })
      .layout();
  }
}
