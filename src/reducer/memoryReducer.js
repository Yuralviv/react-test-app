import * as types from "../action/actionType";

const initialState = {
  tiles: [],
  isWaiting: false,
};

export function memoryReducer(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case types.START_GAME:
      return {
        ...state,
        isWaiting: false,
        tiles: [...action.tiles],
      };
    case types.FLIP_TILE:
      const { index, tile } = action;
      return {
        ...state,
        tiles: [
          ...state.tiles.slice(0, index),
          {
            ...tile,
            flipped: true,
          },
          ...state.tiles.slice(index + 1),
        ],
      };
    case types.TOGGLE_IS_WAITING:
      return {
        ...state,
        isWaiting: action.isWaiting,
      };
    case types.MATCH_CHECK:
      const { tiles } = state;
      if (action.flippedTiles[0].image === action.flippedTiles[1].image) {
        let newTiles = tiles.map((tile) => {
          if (tile.flipped === true && tile.matched === false) {
            return {
              ...tile,
              matched: true,
            };
          } else {
            return tile;
          }
        });
        return {
          ...state,
          tiles: newTiles,
          isWaiting: false,
        };
      } else {
        let newTiles = tiles.map((tile) => {
          if (tile.flipped === true && tile.matched === false) {
            return {
              ...tile,
              flipped: false,
            };
          } else {
            return tile;
          }
        });
        return {
          ...state,
          tiles: newTiles,
          isWaiting: false,
        };
      }
    default:
      return state;
  }
}
