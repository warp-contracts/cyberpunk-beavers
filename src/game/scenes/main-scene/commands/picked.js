import { BEAVER_TYPES, GAMEPLAY_MODES, GameTreasure } from '../../../common/const.mjs';
import { BOOSTS } from '../../../common/boostsConst.mjs';
import { GameObject } from '../../../common/gameObject.mjs';

export function executePick(response, mainScene) {
  const picked = response.picked;
  const player = response.player;
  if (picked) {
    mainScene.allPlayers[player?.walletAddress].boosts.active = player?.activeBoosts;
    const { x, y } = picked?.prevPos || player?.pos;
    mainScene.gameObjectsLayer?.removeTileAt(x, y);
    removeSprite(mainScene, picked, x, y);
    if (mainScene.mainPlayer?.walletAddress === player?.walletAddress) {
      playSound(picked, mainScene);
      mainScene.mainPlayer.equipment = player?.equipment;
      if (picked.type === GameObject.show_map.type) {
        BOOSTS.show_map.effect(mainScene.fov);
      }
      if (picked.type === GameObject.hazard.type) {
        handleHazard(picked, mainScene, player);
      }
      if (picked.type === GameObject.xray.type) {
        BOOSTS.xray.effect(mainScene.fov);
      }
    } else {
      mainScene.allPlayers[player.walletAddress]?.pickAnim();
    }

    if (response.player.activeBoosts[BOOSTS.quad_damage.type]) {
      mainScene.allPlayers[response.player.walletAddress].boosts.showQuadDamageBoost();
    }

    if (response.player.activeBoosts[BOOSTS.shield.type]) {
      mainScene.allPlayers[response.player.walletAddress].boosts.showShieldBoost();
    }

    if (player.onGameTreasure?.tile > 0) {
      mainScene.gameTreasuresLayer?.putTileAt(GameTreasure.hole.tile, x, y);
    }

    if (picked.type === GameTreasure.gun.type && !mainScene.theGunCollectedSound.isPlaying) {
      mainScene.theGunCollectedSound.play();
    }
    mainScene.displayPlayerScore(response.scoreToDisplay, player.walletAddress);
  } else {
    if (mainScene.mainPlayer?.walletAddress === player.walletAddress) {
      mainScene.noCollectSound.play();
    }
  }
  mainScene.updateStats(player, response.gameStats);
}

function removeSprite(self, picked, x, y) {
  const spriteToRemove = self.gameObjectsSprites[y]?.[x];
  if (spriteToRemove && picked?.respawned) {
    spriteToRemove.picked = true;
  } else if (spriteToRemove) {
    spriteToRemove.destroy();
    self.gameObjectsSprites[y][x] = {};
  }
}

function playSound(picked, self) {
  if (picked.type == GameObject.quad_damage.type) {
    self.quadDamage.play();
  } else if (picked.type == GameObject.shield.type) {
    self.shieldSound.play();
  } else if (picked.type !== GameObject.hazard.type) {
    self.pickUpSound.play();
  }
}

function handleHazard(picked, self, player) {
  if (picked.result === 'win') {
    self.treasureSound.play();
  } else {
    self.hahaSound.play();
    self.explosionSound.play();
    self.mainPlayer.explosionAnim().once('animationcomplete', () => {
      if (picked.finished) {
        self.mainPlayer.deathAnim(BEAVER_TYPES.speedy_beaver.name, true).once('animationcomplete', () => {
          if (self.mode === GAMEPLAY_MODES.deathmatch) {
            self.mainPlayer.baseMoveTo(
              player.pos,
              () => {},
              () => self.mainPlayer.blink()
            );
          } else {
            self.mainPlayer.kill();
          }
        });
      }
    });
  }
}
