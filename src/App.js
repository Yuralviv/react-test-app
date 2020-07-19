import React, { useEffect } from "react";
import TilesBoard from "./components/TilesBoard";
import { useDispatch } from 'react-redux'

import * as types from './action/actionType';

import { startGame } from './action'

import './style/style.scss'

const actionTest = (tiles) => ({
  type: types.START_GAME,
  tiles
})

function App() {
  const dispatch = useDispatch();
  const tiles = startGame();

  useEffect(() => {
    dispatch(actionTest(tiles))
  }, [dispatch, tiles])

  return (
    <div>
      <TilesBoard />
    </div>
  );
}

export default App;
