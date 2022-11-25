import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import _ from "lodash";

import { PathContext } from "../../context/PathContext";

import Portal from "../Portal";
import Modal from "../Modal/Modal.jsx";
import Tile from "../Tile/Tile.jsx";
import Button from "../Button/Button.jsx";

import { canSwap, shuffle, swap, isSolved } from "../../utils/helpers";
import search from "../../utils/search";
import Game from "../../utils/game";
import Node from "../../utils/node";

function Board({ imgUrl, gridSize, boardSize }) {
  const { shortestPath, setShortestPath, userPath, setUserPath } =
    useContext(PathContext);

  const [tiles, setTiles] = useState([1, 2, 3, 4, 5, 6, 7, 8, 0]);
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingModalActive, setIsLoadingModalActive] = useState(false);

  const shuffleTiles = () => {
    const shuffledTiles = shuffle(tiles);
    setTiles(shuffledTiles);

    const newUserPath = [];
    newUserPath.push(shuffledTiles);
    setUserPath(newUserPath);

    setIsLoading(true);
    setIsLoadingModalActive(true);
  };

  const swapTiles = (tileIndex) => {
    if (canSwap(tileIndex, tiles.indexOf(0))) {
      const swappedTiles = swap(tiles, tileIndex, tiles.indexOf(0));
      setTiles(swappedTiles);

      const newUserPath = [...userPath];

      if (newUserPath[newUserPath.length - 1] !== swappedTiles) {
        newUserPath.push(swappedTiles);
        setUserPath(newUserPath);
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

  const handleTileClick = (index) => {
    swapTiles(index);
  };

  const searchCallback = (err, options) => {
    console.log("end??", options.node);

    if (options.node.state !== "123456780") {
      shuffleTiles();
    } else {
      setShortestPath(options.node);
      setIsLoading(false);

      return options.node;
    }
  };

  useEffect(() => {
    if (isStarted && shortestPath.length === 0) {
      findPath();
    }
  }, [tiles]);

  const pieceWidth = Math.round(boardSize / gridSize);
  const pieceHeight = Math.round(boardSize / gridSize);

  const hasWon = isSolved(tiles);

  return (
    <Wrapper>
      {hasWon && isStarted && <div className="score">SCORE: 100!! 🎉</div>}
      <ul className="board" width={boardSize} height={boardSize}>
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
        <Button text="START GAME" onClick={() => handleStartClick()} />
      ) : (
        <Button text="RESTART GAME" onClick={() => handleShuffleClick()} />
      )}

      {isLoading && (
        <Portal>
          <Modal
            className="wait-modal"
            title="Shuffling..."
            isActive={isLoadingModalActive}>
            <p>Wait a minute..</p>
            <p>It may take up to one minute.</p>
          </Modal>
        </Portal>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  & .score {
    text-align: center;
    font-size: 30px;
    color: #ffff00;
    width: 400px;
    margin: 0 auto 15px;
  }

  & .board {
    min-width: 600px;
    min-height: 600px;
  }
`;

export default Board;
