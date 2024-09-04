import Phaser from 'phaser';

export function doInitCamera(mainScene, spectatorMode) {
  const camera = mainScene.cameras.main;

  camera.setSize(mainScene.game.scale.width, mainScene.game.scale.height);
  if (!spectatorMode) {
    camera.startFollow(mainScene.mainPlayer, true);
  }
  camera.setZoom(1);

  let cameraDragStartX;
  let cameraDragStartY;

  mainScene.input.on('pointerdown', () => {
    cameraDragStartX = camera.scrollX;
    cameraDragStartY = camera.scrollY;
  });

  mainScene.input.on('pointermove', (pointer) => {
    if (pointer.isDown) {
      camera.scrollX = cameraDragStartX + (pointer.downX - pointer.x) / camera.zoom;
      camera.scrollY = cameraDragStartY + (pointer.downY - pointer.y) / camera.zoom;
    }
  });

  mainScene.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
    // Get the current world point under pointer.
    const worldPoint = camera.getWorldPoint(pointer.x, pointer.y);
    const newZoom = camera.zoom - camera.zoom * 0.001 * deltaY;
    camera.zoom = Phaser.Math.Clamp(newZoom, 0.25, 2);

    // Update camera matrix, so `getWorldPoint` returns zoom-adjusted coordinates.
    camera.preRender();
    const newWorldPoint = camera.getWorldPoint(pointer.x, pointer.y);
    // Scroll the camera to keep the pointer under the same world point.
    camera.scrollX -= newWorldPoint.x - worldPoint.x;
    camera.scrollY -= newWorldPoint.y - worldPoint.y;
  });
}
