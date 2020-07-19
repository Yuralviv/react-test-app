import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import Tile from "./Tile";
import * as actions from "../action";

export class TilesBoard extends Component {
  componentDidUpdate() {
    const { tiles, toggleIsWaiting, matchCheck, incrementTries } = this.props;
    const flippedTiles = _.filter(
      tiles,
      _.matches({ flipped: true, matched: false })
    );

    if (flippedTiles.length >= 2) {
      toggleIsWaiting(true);
      if (this.props.isWaiting) {
        incrementTries();
        setTimeout(() => {
          matchCheck(flippedTiles);
        }, 500);
      }
    }
  }

  onHandleClickTile = (tile, index) => {
    const { flipTile, isWaiting } = this.props;

    if (isWaiting) return;

    flipTile(index, tile);
  };

  render() {
    const { tiles } = this.props;
    console.log(tiles);
    return (
      <div className="container gameboard">
        <div className="row">
          {tiles.map((tile, i) => {
            return (
              <Tile
                tile={tile}
                key={i}
                index={i}
                onClickTile={this.onHandleClickTile}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tiles: state.memory.tiles,
    isWaiting: state.memory.isWaiting,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      toggleIsWaiting: actions.toggleIsWaiting,
      incrementTries: actions.incrementTries,
      matchCheck: actions.matchCheck,
      flipTile: actions.flipTile,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TilesBoard);
