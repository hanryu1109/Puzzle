import Tile from "../Tile/Tile";

function Board({ imgUrl }) {
  const TILE_COUNT = 9;
  const GRID_SIZE = 3;
  const BOARD_SIZE = 600;

  const tiles = [...Array(TILE_COUNT).keys()];

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
    </>
  );
}

export default Board;
