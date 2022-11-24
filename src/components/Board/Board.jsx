import { useState, useEffect, useContext } from "react";
import _ from "lodash";

import Tile from "../Tile/Tile.jsx";
import { canSwap, shuffle, swap, isSolved } from "../../utils/helpers";
import search from "../../utils/search";
import Game from "../../utils/game";
import Node from "../../utils/node";
import { PathContext } from "../../context/PathContext";

function Board({ imgUrl, gridSize, boardSize }) {
  const { setPath1, setPath2 } = useContext(PathContext);

  const [tiles, setTiles] = useState([1, 2, 3, 4, 5, 6, 7, 8, 0]);
  const [shortestPath, setShortestPath] = useState();
  const [userPath, setUserPath] = useState([]);

  const [isStarted, setIsStarted] = useState(false);

  const shuffleTiles = () => {
    const shuffledTiles = shuffle(tiles);
    setTiles(shuffledTiles);

    const newUserPath = [];
    newUserPath.push(shuffledTiles);
    setUserPath(newUserPath);
    setPath1(newUserPath);
  };

  const swapTiles = (tileIndex) => {
    if (canSwap(tileIndex, tiles.indexOf(0))) {
      const swappedTiles = swap(tiles, tileIndex, tiles.indexOf(0));
      setTiles(swappedTiles);

      const newUserPath = [...userPath];

      if (newUserPath[newUserPath.length - 1] !== swappedTiles) {
        newUserPath.push(swappedTiles);
        setUserPath(newUserPath);
        setPath1(newUserPath);
      }
    }
  };

  const handleShuffleClick = () => {
    shuffleTiles();
  };

  const handleStartClick = () => {
    shuffleTiles();
    setIsStarted(true);
  };

  const findPath = () => {
    const game = new Game(tiles.join(""));
    const initialNode = new Node({ state: game.state });
    return search({
      node: initialNode,
      iterationLimit: 1000,
      depthLimit: 0,
      type: "aStar",
      callback: searchCallback,
    });
  };

  useEffect(() => {
    if (isStarted && !shortestPath) {
      findPath();
    }
  }, [tiles]);

  const handleTileClick = (index) => {
    swapTiles(index);
  };

  function searchCallback(err, options) {
    const expandedNodesLength = _.size(options.expandedNodes);
    window.winnerNode = err ? null : options.node;
    console.log("end??", options.node);

    if (options.node.state !== "123456780") {
      shuffleTiles();
    } else {
      setShortestPath(options.node);
      setPath2(options.node);
      return options.node;
    }
  }

  const pieceWidth = Math.round(boardSize / gridSize);
  const pieceHeight = Math.round(boardSize / gridSize);

  const style = {
    minWidth: boardSize,
    minHeight: boardSize,
  };
  const hasWon = isSolved(tiles);
  const scoreStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#ffff00",
    width: "400px",
    margin: "0 auto 15px",
  };

  return (
    <>
      {hasWon && isStarted && (
        <div className="score" style={scoreStyle}>
          SCORE: 100!! 🎉
        </div>
      )}
      <ul style={style} className="board">
        {tiles.map((tile, index) => (
          <Tile
            key={tile}
            index={index}
            imgUrl={imgUrl}
            tile={tile}
            width={pieceWidth}
            height={pieceHeight}
            handleTileClick={handleTileClick}
          />
        ))}
      </ul>

      {!isStarted ? (
        <button onClick={() => handleStartClick()}>START GAME</button>
      ) : (
        <button onClick={() => handleShuffleClick()}>RESTART GAME</button>
      )}
    </>
  );
}

export default Board;