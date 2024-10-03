import { BEAVER_TYPES, BonusType, GameTreasure, GAME_MODES } from '../common/const.mjs';
import { playClick } from '../utils/mithril';

export function CharacterPickGui() {
  return {
    view: function (vnode) {
      const { setCharacter, beaverChoice, gameplayMode } = vnode.attrs;
      let characters = beaverChoice ? [beaverChoice] : Object.keys(BEAVER_TYPES);
      async function handleClick(character) {
        if (!beaverChoice) {
          playClick();
          await setCharacter(character);
        }
      }

      return m('.character-pick', [
        m(
          `.character-pick-title${!beaverChoice ? '.blink' : ''}`,
          `${beaverChoice ? 'GET READY FOR THE NEXT BATTLE' : 'PICK YOUR CHARACTER'}`
        ),
        m(
          '.characters',
          characters.map((c) => m(CharacterOption, { character: c, beaverChoice, handleClick, gameplayMode }))
        ),
      ]);
    },
  };
}

function CharacterOption() {
  return {
    view: function (vnode) {
      const { character, handleClick, beaverChoice, gameplayMode } = vnode.attrs;
      const stats = {
        ...BEAVER_TYPES[character].stats,
        ...BEAVER_TYPES[character].stats[gameplayMode],
      };

      const weapon = stats.weapon;

      return m(
        `.character ${beaverChoice && 'selected'}`,
        {
          onclick: async () => {
            await handleClick(character);
          },
        },
        [
          m('img', { class: 'character-image', src: `assets/images/beavers/${character}/${character}_200px.png` }),
          m('.character-box', [
            m('.character-box-container', [
              m('.character-box-interrior', [
                m('.character-box-title', [m('div', character.split('_').join(' '))]),
                m('.d-flex flex-column', [
                  m(CharacterAbility, { name: 'ACTION POINTS', value: stats.ap.max, color: 'ap' }),
                  m(CharacterAbility, { name: 'HEALTH POINTS', value: stats.hp.max, color: 'hp' }),
                  m(CharacterAbility, { name: 'FIELD OF VIEW', value: stats.fov }),
                  m(CharacterAbility, {
                    name: 'TOKEN BONUS',
                    value: stats.bonus[GAME_MODES[warpAO.config.mode].token],
                  }),
                  m(CharacterAbility, {
                    name: 'KILL BONUS',
                    value: stats.bonus[BonusType.KillBonus],
                  }),
                ]),
                m('.character-box-title', [m('div', weapon.name)]),
                m('.d-flex flex-column', [
                  m(CharacterAbility, {
                    name: 'ATTACKS PER SECOND',
                    value: `${Math.round((1000 / weapon.attack_recovery_ms) * 100) / 100}`,
                  }),
                  m(CharacterAbility, {
                    name: 'RANGE',
                    value: `${weapon.attack_range} FIELD${weapon.attack_range > 1 ? 's' : ''}`,
                  }),
                  m(
                    '.character-box-with-corners-container with-padding',
                    weapon.damage.map((d, i) => {
                      return m(CharacterBoxWithCorners, {
                        i: i + 1,
                        damage: { hint: 'damage', value: d },
                        hitChance: { hint: 'hit chance', value: weapon.hit_chance[i] },
                        criticalHitChance: { hint: 'critical hit chance', value: weapon.critical_hit_chance[i] },
                        criticalHitMultiplier: {
                          hint: 'critical hit multiplier',
                          value: weapon.critical_hit_multiplier[i],
                        },
                      });
                    })
                  ),
                ]),
              ]),
            ]),
          ]),
        ]
      );
    },
  };
}

function CharacterAbility() {
  return {
    view: function (vnode) {
      const { name, value, color } = vnode.attrs;
      return m('.character-ability d-flex justify-between', [m('div', name), m('div', { class: color }, value)]);
    },
  };
}

function CharacterBoxWithCorners() {
  return {
    view: function (vnode) {
      const { damage, hitChance, criticalHitChance, criticalHitMultiplier, i } = vnode.attrs;
      return m('.character-box-with-corners', [
        m('.corner.middle', [m('span', i)]),
        m('.corner.top-left.hp', [`${damage.value}HP`, m('span.hint', damage.hint)]),
        m('.corner.top-right', [formatPercent(hitChance.value), m('span.hint', hitChance.hint)]),
        m('.corner.bottom-left', [formatPercent(criticalHitChance.value), m('span.hint', criticalHitChance.hint)]),
        m('.corner.bottom-right', [`${criticalHitMultiplier.value}x`, m('span.hint', criticalHitMultiplier.hint)]),
      ]);
    },
  };
}

function formatPercent(value) {
  return `${Math.round(value * 100)}%`;
}
