const GRID_SIZE = 3;

export function getMatrixPosition(index) {
  return {
    row: Math.floor(index / GRID_SIZE),
    col: index % GRID_SIZE,
  };
}

export function getVisualPosition(row, col, width, height) {
  return {
    x: col * width,
    y: row * height,
  };
}
