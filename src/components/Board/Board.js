import { useState } from "react";
import Tile from "../Tile/Tile";
import { shuffle } from "../../utils/helpers";

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

  const handleShuffleClick = () => {
    shuffleTiles();
  };

  const handleStartClick = () => {
    shuffleTiles();
    setIsStarted(true);
  };

  const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
  const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE);
  const style = {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  };

  return (
    <>
      <ul style={style} className="board">
        {tiles.map((tile, index) => (
          <Tile
            key={tile}
            index={index}
            imgUrl={imgUrl}
            tile={tile}
            width={pieceWidth}
            height={pieceHeight}
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
