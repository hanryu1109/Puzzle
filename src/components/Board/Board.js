import { useState } from "react";
import Tile from "../Tile/Tile";
import { canSwap, shuffle, swap, isSolved } from "../../utils/helpers";

function Board({ imgUrl }) {
  const TILE_COUNT = 9;
  const GRID_SIZE = 3;
  const BOARD_SIZE = 600;

  const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
  const [isStarted, setIsStarted] = useState(false);

  const shuffleTiles = () => {
    const shuffledTiles = shuffle(tiles);
    setTiles(shuffledTiles);
  };

  const swapTiles = (tileIndex) => {
    if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
      const swappedTiles = swap(
        tiles,
        tileIndex,
        tiles.indexOf(tiles.length - 1)
      );
      setTiles(swappedTiles);
    }
  };

  const handleShuffleClick = () => {
    shuffleTiles();
  };

  const handleStartClick = () => {
    shuffleTiles();
    setIsStarted(true);
  };

  const handleTileClick = (index) => {
    swapTiles(index);
  };

  const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
  const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE);
  const style = {
    minWidth: BOARD_SIZE,
    minHeight: BOARD_SIZE,
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
          SCORE: 100!! 🧠 🎉
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
