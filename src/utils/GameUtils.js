import {
  AVATAR_PANEL_END,
  AVATAR_PANEL_START,
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

export function getRemainingBuildTime(houses) {
  const currentTime = Math.floor(new Date().getTime() / 1000);
  if (currentTime < houses.startBuildTime + houses.buildTime) {
    return houses.buildTime - (currentTime - houses.startBuildTime);
  }
  return 0;
}

export function convertSecondsToText(time) {
  const secNum = parseInt(time, 10);
  const hours = Math.floor(secNum / 3600);
  const minutes = Math.floor((secNum - hours * 3600) / 60);
  const seconds = secNum - hours * 3600 - minutes * 60;

  if (hours > 0) {
    return `${hours} hr ${minutes} min ${seconds} s`;
  }
  if (minutes > 0) {
    return `        ${minutes} min ${seconds} s`;
  }
  return `             ${seconds} s`;
}

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

  if (
    x > AVATAR_PANEL_START[0] &&
    x < AVATAR_PANEL_END[0] &&
    y > AVATAR_PANEL_START[1] &&
    y < AVATAR_PANEL_END[1]
  ) {
    return false;
  }

  return true;
}
