import Const from "../common/const.mjs";

const SIZE = 30;
let i = -1;
let j = 0;
const tiles = [1,1,1,1,1,1,1,2,3,4,5,6]
const state = {
    map: {
        width: SIZE,
        height: SIZE,
    },
    round: {
        current: 0,
        start: Date.now(),
        interval: 5000
    },
    players: {},
    playersOnTiles: Array(SIZE).fill([]).map(() => Array(SIZE)),
    level1: Array(SIZE).fill([]).map(() => {
        i++;
        j = 0;
        if (i === 0) {
            return Array(SIZE).fill(7);
        }
        if (i === SIZE - 1) {
            return Array(SIZE).fill(8);
        }
        return Array(SIZE).fill(0).map(() => {
            j++;
            if (j === 3 || j === 10 || j === 15) {
                return 0;
            }
            return tiles[getRandomNumber(0, tiles.length-1)];
        })
    }),
    level2: Array(SIZE).fill([]).map(() => Array(SIZE).fill(0).map(() => getRandomNumber(0, 3)))
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gameRoundTick() {
    const tsNow = Date.now();
    const tsChange = tsNow - state.round.start;
    const round = ~~(tsChange / state.round.interval);
    console.log('Last round ', state.round);
    state.round.current = round;
    console.log(`new ts ${tsNow}  change ${tsChange}  round up to ${state.round.current}`);
}

function gamePlayerTick(player) {
    if (player.stats.round.last < state.round.current) {
        player.stats.ap.current = player.stats.ap.max;
        player.stats.round.last = state.round.current;
    }
}

function step(pos, dir) {
    switch (dir) {
        case Const.Direction.left :  return [pos[0]-1, pos[1]];
        case Const.Direction.right : return [pos[0]+1, pos[1]];
        case Const.Direction.up :    return [pos[0], pos[1]-1];
        case Const.Direction.down :  return [pos[0], pos[1]+1];
    }
}

function attack(message) {
    gameRoundTick();
    const player = state.players[message.pid];
    gamePlayerTick(player);
    if (player.stats.ap.current < 1) {
        console.log(`Cannot perform attak ${player.name}. Not enough ap ${player.stats.ap.current}`);
        return { player };
    }
    const attackPos = step(player.pos, message.dir);
    player.stats.ap.current -= 1;

    if (state.playersOnTiles[attackPos[1]][attackPos[0]]) {
        const opponent = state.players[state.playersOnTiles[attackPos[1]][attackPos[0]]];
        console.log(`Player ${player.name} attacked ${opponent.name}`);
        opponent.stats.hp -= 10;
        player.stats.score += 10;
        return { player, opponent };
    } else if ([2,4,6].includes(state.level1[attackPos[1]][attackPos[0]])) {
        console.log(`Attack found obstacle ${player.name}. Tile ${attackPos} has obstacle`);
    }
    return { player };
}


function movePlayer(message) {
    gameRoundTick();
    const player = state.players[message.pid];
    gamePlayerTick(player);
    if (player.stats.ap.current < 1) {
        console.log(`Cannot move ${player.name}. Not enough ap`);
        return player;
    }

    const newPos = step(player.pos, message.dir);

    if (newPos[0] < 0 || newPos[0] >= SIZE || newPos[1] < 0 || newPos[1] >= SIZE) {
        console.log(`Cannot move ${player.name}. Reached edge of the universe ${newPos}`);
        return player;
    } else if (state.playersOnTiles[newPos[1]][newPos[0]]) {
        console.log(`Cannot move ${player.name}. Tile ${newPos} occupied by ${state.playersOnTiles[newPos[1]][newPos[0]]}`);
        return player;
    } else if ([2,4,6].includes(state.level1[newPos[1]][newPos[0]])) {
        console.log(`Cannot move ${player.name}. Tile ${newPos} has obstacle`);
        return player;
    } else {
        state.playersOnTiles[player.pos[1]][player.pos[0]] = null;
        state.playersOnTiles[newPos[1]][newPos[0]] = player.name;
        player.pos = newPos;
        player.stats.ap.current -= 1;
        return player;
    }
}

function registerPlayer(randomId) {
    gameRoundTick();
    let newPlayer = {
        name: names[randomId].replace(/\s/g, ''),
        stats: {
            ap: {
                current: 10,
                max: 10
            },
            hp: {
                current: 100,
                max: 100,
            },
            round: {
                last: 0
            },
            score: 0,
        },
        pos: [randomId, randomId]
    }
    names.splice(randomId, 1);
    return state.players[newPlayer.name] = newPlayer;
}


let names = [
    'Byteblade',
    'Cyberclaw Assassin',
    'Techshredder',
    'Nanofang Fury',
    'Blitzgnawer',
    'Machbyte Marauder',
    'Cyberblade Berserker',
    'Circuitcarver',
    'Byteburst Butcher',
    'Razorbyte Ravager',
    'Cyberfury Fangs',
    'Blitzgnasher',
    'Megabyte Mauler',
    'Byteblitz Bruiser',
    'Circuitcrusher',
    'Nanoblade Ninja',
    'Datastream Slayer',
    'Cyberstorm Striker',
    'Bytebreaker Banshee',
    'Techterror Tusk'];

export default {
    attack, state, movePlayer, names, registerPlayer
}

