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

function movePlayer(message) {
    const player = state.players[message.pid];
    const newPos = [...player.pos];
    switch (message.dir) {
        case Const.Direction.left :
            newPos[0] -= 1;
            break;
        case Const.Direction.right :
            newPos[0] += 1;
            break;
        case Const.Direction.up :
            newPos[1] -= 1;
            break;
        case Const.Direction.down :
            newPos[1] += 1;
            break;
    }

    if (newPos[0] < 0 || newPos[0] >= SIZE || newPos[1] < 0 || newPos[1] >= SIZE) {
        console.log(`Cannot move ${player.name}. Reached edge of the universe ${newPos}`);
        return player.pos;
    } else if (state.playersOnTiles[newPos[1]][newPos[0]]) {
        console.log(`Cannot move ${player.name}. Tile ${newPos} occupied by ${state.playersOnTiles[newPos[1]][newPos[0]]}`);
        return player.pos;
    } else if ([2,4,6].includes(state.level1[newPos[1]][newPos[0]])) {
        console.log(`Cannot move ${player.name}. Tile ${newPos} has obstacle`);
        return player.pos;
    } else {
        state.playersOnTiles[player.pos[1]][player.pos[0]] = null;
        state.playersOnTiles[newPos[1]][newPos[0]] = player.name;
        player.pos = newPos;
        return newPos;
    }
}

function registerPlayer(randomId) {
    let newPlayer = {
        name: names[randomId].replace(/\s/g, ''),
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
    state, movePlayer, names, registerPlayer
}

