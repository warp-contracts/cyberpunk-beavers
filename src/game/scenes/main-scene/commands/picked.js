import { BEAVER_TYPES, BOOSTS, GameObject, GAMEPLAY_MODES, GameTreasure } from '../../../common/const.mjs';

export function executePick(response, self) {
  const picked = response.picked;
  const player = response.player;
  if (picked) {
    self.allPlayers[player?.walletAddress].boosts.active = player?.activeBoosts;
    const { x, y } = picked?.prevPos || player?.pos;
    self.gameObjectsLayer?.removeTileAt(x, y);
    removeSprite(self, picked, x, y);
    if (self.mainPlayer?.walletAddress === player?.walletAddress) {
      playSound(picked, self);
      self.mainPlayer.equipment = player?.equipment;
      if (picked.type === GameObject.show_map.type) {
        BOOSTS.show_map.effect(self.fov);
      }
      if (picked.type === GameObject.hazard.type) {
        handleHazard(picked, self, player);
      }
    } else {
      self.allPlayers[player.walletAddress]?.pickAnim();
    }

    if (response.player.activeBoosts[BOOSTS.quad_damage.type]) {
      self.allPlayers[response.player.walletAddress].boosts.showQuadDamageBoost();
    }

    if (response.player.activeBoosts[BOOSTS.shield.type]) {
      self.allPlayers[response.player.walletAddress].boosts.showShieldBoost();
    }

    if (player.onGameTreasure?.tile > 0) {
      self.gameTreasuresLayer?.putTileAt(GameTreasure.hole.tile, x, y);
    }

    if (picked.type == GameTreasure.gun.type && !self.theGunCollectedSound.isPlaying) {
      self.theGunCollectedSound.play();
    }
    self.displayPlayerScore(response.scoreToDisplay, player.walletAddress);
  } else {
    if (self.mainPlayer?.walletAddress === player.walletAddress) {
      self.noCollectSound.play();
    }
  }
  self.updateStats(player, response.gameStats);
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
