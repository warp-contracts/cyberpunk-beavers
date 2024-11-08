export class ClientUpdates {
  constructor(state) {
    this._state = state;
    this._updates = {
      players: {},
      monsters: {},
      game: {},
    };
  }

  add({ target, scores, stats, action }) {
    if (!this._updates[target.type][target.id]) {
      this._updates[target.type][target.id] = {
        scores: [],
        actions: [],
        fullObject: null,
      };
    }
    if (scores?.length) {
      this._updates[target.type][target.id].scores.push(...scores);
    }
    if (stats) {
      this._updates[target.type][target.id].stats = stats;
    }
    if (action) {
      this._updates[target.type][target.id].actions.push(action);
    }
    if (target.type === 'monsters') {
      this._updates[target.type][target.id].fullObject = this._state.currentWave.monsters[target.id];
    }
  }

  addMany(updates) {
    for (const update of updates) {
      this.add(update);
    }
  }

  set gameStatus(value) {
    this._updates.game.status = value;
  }

  set waveNumber(value) {
    this._updates.game.waveNumber = value;
  }

  set newWave(value) {
    this._updates.game.newWave = value;
  }

  set isLastWave(value) {
    this._updates.game.isLastWave = value;
  }

  set aliveMonsters(value) {
    this._updates.game.aliveMonsters = value;
  }

  set alivePlayers(value) {
    this._updates.game.alivePlayers = value;
  }

  get updates() {
    return this._updates;
  }
}
