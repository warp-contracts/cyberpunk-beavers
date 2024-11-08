import { doPlayAttackSound, doPlayOpponentFinishedSound } from '../sounds';
import { GAMEPLAY_MODES } from '../../../common/const.mjs';
import { FRONT_LAYER_DEPTH } from '../../../common/mapsLayersConst.mjs';

export function handleAttacked(response, mainScene) {
  const isKillerMainPlayer = response.player?.walletAddress === mainScene.mainPlayer?.walletAddress;
  const isOpponentMainPlayer = response.opponent?.walletAddress === mainScene.mainPlayer?.walletAddress;
  if (isOpponentMainPlayer || mainScene.spectatorMode) {
    doPlayAttackSound(response.player.beaverId, mainScene);
  }
  if (isKillerMainPlayer) {
    mainScene.lastAttack.criticalHit = response.damage?.criticalHit;
    if (response.damage?.criticalHit && !mainScene.criticalHitSound?.isPlaying) {
      mainScene.criticalHitSound?.play();
    }
  }
  mainScene.updateStats(response.player, response.gameStats);
  mainScene.updateStats(response.opponent, response.gameStats);
  if (response.player.walletAddress !== mainScene.mainPlayer?.walletAddress) {
    mainScene.allPlayers[response.player.walletAddress]?.attackAnim();
  }
  const opponent = mainScene.allPlayers[response.opponent?.walletAddress];
  opponent.boosts.animateShieldBoost();
  const killer = mainScene.allPlayers[response.player?.walletAddress];
  killer.boosts.animateQuadDamageBoost();
  if (isKillerMainPlayer || isOpponentMainPlayer) {
    killer.boosts.playQuadDamageSound(mainScene);
    opponent.boosts.playShieldSound(mainScene);
  }
  if (response.opponentFinished) {
    opponent?.lock();
    opponent.boosts.hideQuadDamageBoost();
    opponent.boosts.hideShieldBoost();
    if (isKillerMainPlayer) {
      setTimeout(() => {
        doPlayOpponentFinishedSound(response.player, response.revenge, mainScene);
      }, 900);
    } else if (isOpponentMainPlayer) {
      if (!mainScene.beaverEliminatedSound.isPlaying) {
        mainScene.beaverEliminatedSound.play();
      }
    }

    if (response.additionalLoot?.token && (isKillerMainPlayer || isOpponentMainPlayer)) {
      animateAdditionalLoot(mainScene, opponent, killer, response.additionalLoot.token);
    }

    opponent
      ?.deathAnim(response.player.beaverId, isOpponentMainPlayer || isKillerMainPlayer || mainScene.spectatorMode)
      .once('animationcomplete', () => {
        if (mainScene.mode === GAMEPLAY_MODES.deathmatch) {
          opponent.baseMoveTo(
            response.opponent.pos,
            () => {},
            () => opponent.blink()
          );
          opponent.unlock();
        } else {
          opponent.kill();
        }
      });
  } else {
    opponent?.bloodSplatAnim(isOpponentMainPlayer || isKillerMainPlayer);
  }
  mainScene.displayPlayerScore(response.scoreToDisplay, response.player.walletAddress, {
    forOpponent: {
      score: response.opponentScoreToDisplay,
      walletAddress: response.opponent?.walletAddress,
    },
  });
}

function animateAdditionalLoot(mainScene, opponent, killer, token) {
  const opponentOnRight = opponent.x > killer.x;
  const emitter = mainScene.add
    .particles(0, 0, token, {
      x: {
        start: opponent.x + (opponentOnRight ? 24 : -24),
        end: opponentOnRight ? window.innerWidth : -1,
        ease: 'sine.in',
      },
      y: { start: opponent.y - 24, end: -1 },
      lifespan: 2000,
      frequency: 150,
      emitting: false,
      stopAfter: 5,
      scale: 1,
      rotate: { start: 0, end: 360 },
      speed: { min: 50, max: 100 },
    })
    .setDepth(FRONT_LAYER_DEPTH);

  emitter.start();
  mainScene.additionalLoot.play();
}
