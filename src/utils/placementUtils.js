// import {
//   TILE_HEIGHT,
//   TILE_HEIGHT_HALF,
//   TILE_WIDTH,
//   TILE_WIDTH_HALF,
// } from './constants';

import checkInMovableRange from './GameUtils';

let cellImage;
let previousX;
let previousY;
let cursorX;
let cursorY;
let isBuilding = false;

export const setIsBuilding = (newIsBuilding) => {
  isBuilding = newIsBuilding;
  if (!newIsBuilding && cellImage) {
    cellImage.destroy();
  }
};

export const addHighlightSquare = (newX, newY, scene) => {
  const inMovableRange = checkInMovableRange(newX, newY);
  if (inMovableRange) {
    cursorX = newX;
    cursorY = newY;
  }
  if (cellImage && (!isBuilding || !inMovableRange)) {
    cellImage.destroy();
    return;
  }
  if (!isBuilding || !inMovableRange) {
    return;
  }
  if (cellImage && (newY !== previousY || newX !== previousX)) {
    cellImage.destroy();
  } else if (cellImage && newY === previousY && newX === previousX) {
    return;
  }
  cellImage = scene.add.image(newX, newY, 'green');
  cellImage.depth = 800;
  cellImage.setAlpha(0.3);
  previousX = newX;
  previousY = newY;
};

export const getCursorCoord = () => [cursorX, cursorY];

export const getHighlightSquareCoord = () => [previousX, previousY];

export const getIsBuilding = () => isBuilding;
