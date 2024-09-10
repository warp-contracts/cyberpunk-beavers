import Phaser from 'phaser';
import { MINIMAP_SIZE_PX } from '../../common/const.mjs';

let lastPointerDownTime = 0;

export const TOP_MARGIN = 20;

export function doInitCamera(mainScene, spectatorMode) {
  const camera = mainScene.cameras.main;
  camera.setBounds(0, -TOP_MARGIN, mainScene.tileMap.widthInPixels, mainScene.tileMap.heightInPixels + 110);
  //camera.setBackgroundColor(0x808080);

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
    let clickDelay = mainScene.time.now - lastPointerDownTime;
    lastPointerDownTime = mainScene.time.now;
    if (clickDelay < 350) {
      camera.startFollow(mainScene.mainPlayer, true);
      camera.setZoom(1);
    }
  });

  mainScene.input.on('pointermove', (pointer) => {
    if (pointer.leftButtonDown()) {
      camera.stopFollow();
      camera.scrollX = cameraDragStartX + (pointer.downX - pointer.x) / camera.zoom;
      camera.scrollY = cameraDragStartY + (pointer.downY - pointer.y) / camera.zoom;
    }
    if (pointer.rightButtonDown()) {
      camera.startFollow(mainScene.mainPlayer, true);
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

  createMinimap(mainScene, spectatorMode);
}

function createMinimap(mainScene, spectatorMode) {
  const mapWidth = mainScene.tileMap.widthInPixels;
  const mapHeight = mainScene.tileMap.heightInPixels;
  const miniMapWidth = MINIMAP_SIZE_PX; //mapWidth / MINIMAP_FACTOR;
  const miniMapHeight = MINIMAP_SIZE_PX; //mapHeight / MINIMAP_FACTOR;
  mainScene.minimap = mainScene.cameras
    .add(mainScene.game.scale.width - miniMapWidth, TOP_MARGIN, miniMapWidth, miniMapHeight)
    .setZoom(MINIMAP_SIZE_PX / mapWidth)
    .setName('mini');
  mainScene.minimap.setBackgroundColor(0x808080);
  if (!spectatorMode) {
    mainScene.minimap.startFollow(mainScene.mainPlayer, true);
  }
  mainScene.minimap.setBounds(0, 0, mapWidth, mapHeight);

  const miniMapKey = mainScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
  miniMapKey.on('up', () => {
    mainScene.minimap.setVisible(!mainScene.minimap.visible);
  });
}
