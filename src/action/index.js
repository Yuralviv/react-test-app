import * as types from './actionType';
import { getTiles } from '../randomTiles';

export function startGame() {
  const tiles = getTiles()
  return tiles;
}

export function flipTile(index, tile) {
  return {
    type: types.FLIP_TILE,
    index,
    tile
  }
}

export function toggleIsWaiting(isWaiting) {
  return {
    type: types.TOGGLE_IS_WAITING,
    isWaiting
  }
}

export function incrementTries() {
  return {
    type: types.INCREMENT_TRIES
  }
}

export function matchCheck(flippedTiles) {
  return {
    type: types.MATCH_CHECK,
    flippedTiles
  }
}
