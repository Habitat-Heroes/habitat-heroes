import {
  BUILD_BUTTON_END,
  BUILD_BUTTON_START,
  COINS_BUTTON_END,
  COINS_BUTTON_START,
  GAME_SCENE_PADDING,
  MAP_HEIGHT,
  MAP_WIDTH,
  RIGHT_BUTTONS_START,
  TILE_HEIGHT,
  TILE_WIDTH,
} from './constants';

export default function checkInMovableRange(x, y) {
  if (
    x < GAME_SCENE_PADDING ||
    y < GAME_SCENE_PADDING ||
    y > MAP_HEIGHT * TILE_HEIGHT - GAME_SCENE_PADDING ||
    x > MAP_WIDTH * TILE_WIDTH - GAME_SCENE_PADDING
  ) {
    return false;
  }

  // Check if it is in the range of the buttons on the right
  if (x > RIGHT_BUTTONS_START[0] && y > RIGHT_BUTTONS_START[1]) {
    return false;
  }

  // Check if it is in the range of the build button
  if (
    x > BUILD_BUTTON_START[0] &&
    x < BUILD_BUTTON_END[0] &&
    y > BUILD_BUTTON_START[1] &&
    y < BUILD_BUTTON_END[1]
  ) {
    return false;
  }

  if (
    x > COINS_BUTTON_START[0] &&
    x < COINS_BUTTON_END[0] &&
    y > COINS_BUTTON_START[1] &&
    y < COINS_BUTTON_END[1]
  ) {
    return false;
  }

  return true;
}
