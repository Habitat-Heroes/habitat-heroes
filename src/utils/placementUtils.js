// import {
//   TILE_HEIGHT,
//   TILE_HEIGHT_HALF,
//   TILE_WIDTH,
//   TILE_WIDTH_HALF,
// } from './constants';

let cellImage;
let previousX;
let previousY;
let isBuilding = false;

// const getClosestIsoCoords = (movingPointer) => {
//   const x = 10;
//   return [movingPointer.x, movingPointer.y];
// };

export const setIsBuilding = (newIsBuilding) => {
  isBuilding = newIsBuilding;
  if (!newIsBuilding && cellImage) {
    cellImage.destroy();
  }
};

export const addHighlightSquare = (newX, newY, scene) => {
  if (cellImage && !isBuilding) {
    cellImage.destroy();
    return;
  }
  if (!isBuilding) {
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
