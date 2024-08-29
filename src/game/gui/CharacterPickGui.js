import { BEAVER_TYPES, BonusType, GameTreasure } from '../common/const.mjs';
import { playClick } from '../utils/mithril';

export function CharacterPickGui() {
  return {
    view: function (vnode) {
      const { changeScene } = vnode.attrs;
      const characters = Object.keys(BEAVER_TYPES);
      return m('.character-pick', [
        m('.character-pick-title.blink', 'PICK YOUR CHARACTER'),
        m(
          '.characters',
          characters.map((c) => m(CharacterOption, { character: c, changeScene }))
        ),
      ]);
    },
  };
}

function CharacterOption() {
  return {
    view: function (vnode) {
      const { character, changeScene } = vnode.attrs;
      const stats = BEAVER_TYPES[character].stats;
      const weapon = stats.weapon;

      return m(
        '.character',
        {
          onclick: () => {
            playClick();
            changeScene(character);
          },
        },
        [
          m('img', { class: 'character-image', src: `assets/images/beavers/${character}/${character}_200px.png` }),
          m('.character-box', [
            m('.character-box-container', [
              m('.character-box-interrior', [
                m('.character-box-title', [m('div', character.split('_').join(' '))]),
                m('.d-flex flex-column', [
                  m(CharacterAbility, { name: 'AP', value: stats.ap.max, color: 'ap' }),
                  m(CharacterAbility, { name: 'HP', value: stats.hp.max, color: 'hp' }),
                  m(CharacterAbility, {
                    name: 'CBTOKEN BONUS',
                    value: stats.bonus[GameTreasure.cbcoin.type],
                  }),
                  m(CharacterAbility, {
                    name: 'KILL BONUS',
                    value: stats.bonus[BonusType.KillBonus],
                  }),
                ]),
                m('.character-box-title', [m('div', weapon.name)]),
                m('.d-flex flex-column', [
                  m(CharacterAbility, {
                    name: 'RECOVERY',
                    value: `${weapon.attack_recovery_ms}MS`,
                  }),
                  m(CharacterAbility, {
                    name: 'RANGE',
                    value: `${weapon.attack_range} FIELDS`,
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
        m('.corner.bottom-right', [criticalHitMultiplier.value, m('span.hint', criticalHitMultiplier.hint)]),
      ]);
    },
  };
}

function formatPercent(value) {
  return `${Math.round(value * 100)}%`;
}
