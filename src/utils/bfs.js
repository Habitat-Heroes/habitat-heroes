/* eslint-disable no-unused-vars */
import {
  TILE_HEIGHT,
  TILE_HEIGHT_HALF,
  TILE_WIDTH,
  TILE_WIDTH_HALF,
} from './constants';
import { isCoordinateFree } from './coordinates';

// Returns a list of pairs of x and y diffs per
export const bfs = (startX, startY, endX, endY) => {
  if (
    (startX === endX && startY === endY) ||
    !isCoordinateFree(endX, endY, true)
  ) {
    return [];
  }
  const seen = new Set();
  const queue = [[startX, startY, []]];
  let result = [];

  while (queue.length > 0) {
    const [currX, currY, path] = queue.shift();
    if (currX === endX && currY === endY) {
      result = [...path, [currX, currY]];
      break;
    }
    if (!isCoordinateFree(currX, currY, true)) {
      // eslint-disable-next-line no-continue
      continue;
    }
    const str = `${currX}-${currY}`;
    if (seen.has(str)) {
      // eslint-disable-next-line no-continue
      continue;
    }
    seen.add(str);
    queue.push([currX, currY - TILE_HEIGHT, [...path, [currX, currY]]]); // top
    queue.push([currX, currY + TILE_HEIGHT, [...path, [currX, currY]]]); // down
    queue.push([currX - TILE_WIDTH, currY, [...path, [currX, currY]]]); // left
    queue.push([currX + TILE_WIDTH, currY, [...path, [currX, currY]]]); // right
    queue.push([
      currX - TILE_WIDTH_HALF,
      currY - TILE_HEIGHT_HALF,
      [...path, [currX, currY]],
    ]); // top-left
    queue.push([
      currX + TILE_WIDTH_HALF,
      currY - TILE_HEIGHT_HALF,
      [...path, [currX, currY]],
    ]); // top-right
    queue.push([
      currX - TILE_WIDTH_HALF,
      currY + TILE_HEIGHT_HALF,
      [...path, [currX, currY]],
    ]); // bottom-left
    queue.push([
      currX + TILE_WIDTH_HALF,
      currY + TILE_HEIGHT_HALF,
      [...path, [currX, currY]],
    ]); // bottom-right
  }

  let resultSteps = [];
  for (let i = 1; i < result.length; i += 1) {
    const previousStep = result[i - 1];
    const currentStep = result[i];

    const diffY = currentStep[1] - previousStep[1];
    if (Math.abs(diffY) > 0) {
      const factor = diffY / (Math.abs(diffY) / 2);
      resultSteps = [
        ...resultSteps,
        ...[...Array(Math.abs(diffY) / 2)].map((_) => [0, factor]),
      ];
    }

    const diffX = currentStep[0] - previousStep[0];
    if (Math.abs(diffX) > 0) {
      const factor = diffX / (Math.abs(diffX) / 2);
      resultSteps = [
        ...resultSteps,
        ...[...Array(Math.abs(diffX) / 2)].map((_) => [factor, 0]),
      ];
    }
  }
  return resultSteps;
};
