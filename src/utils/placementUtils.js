import { TILE_HEIGHT, TILE_WIDTH } from './constants';
import { isCoordinateFree } from './coordinates';

let cellImages = [];
let previousX;
let previousY;
let cursorX;
let cursorY;
let isBuilding = false;
let prevCells = [[0, 0]];
let cells = [[0, 0]];

export const setIsBuilding = (newIsBuilding) => {
  isBuilding = newIsBuilding;
  if (!newIsBuilding && cellImages.length > 0) {
    cellImages.forEach((c) => c.destroy());
    cellImages = [];
  }
};

export const setCells = (newCells) => {
  prevCells = cells;
  cells = newCells;
};

const cellsHasChanged = () => {
  if (cells.length !== prevCells.length) {
    return true;
  }
  return cells.some(
    (c, index) => c[0] !== prevCells[index][0] || c[1] !== prevCells[index][1],
  );
};

export const addHighlightSquares = (newX, newY, scene) => {
  cursorX = newX;
  cursorY = newY;
  if (cellImages.length > 0 && !isBuilding) {
    cellImages.forEach((c) => c.destroy());
    cellImages = [];
    return;
  }
  if (!isBuilding) {
    return;
  }
  if (
    cellImages &&
    (newY !== previousY || newX !== previousX || cellsHasChanged())
  ) {
    cellImages.forEach((c) => c.destroy());
    cellImages = [];
  } else if (
    cellImages.length > 0 &&
    newY === previousY &&
    newX === previousX &&
    !cellsHasChanged()
  ) {
    return;
  }
  for (let i = 0; i < cells.length; i += 1) {
    const [x, y] = cells[i];
    const cellX = newX + x * TILE_WIDTH;
    const cellY = newY + y * TILE_HEIGHT;
    const cellImage = scene.add.image(
      cellX,
      cellY,
      isCoordinateFree(cellX, cellY) ? 'green' : 'pink',
    );
    cellImage.depth = 800;
    cellImage.setAlpha(0.8);
    cellImages.push(cellImage);
  }
  previousX = newX;
  previousY = newY;
};

export const getCursorCoord = () => [cursorX, cursorY];

export const getHighlightSquareCoords = () => cellImages.map((c) => [c.x, c.y]);

export const getIsBuilding = () => isBuilding;
