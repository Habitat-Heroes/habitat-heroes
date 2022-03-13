export const TILE_WIDTH = 64;
export const TILE_HEIGHT = 32;
export const TILE_WIDTH_HALF = TILE_WIDTH / 2;
export const TILE_HEIGHT_HALF = TILE_HEIGHT / 2;
export const MAP_TILE_COUNT = 6;
export const MAP_WIDTH = 25;
export const MAP_HEIGHT = 25;
export const MAP_LAYOUT = [
  24, 24, 23, 11, 19, 19, 12, 23, 24, 24, 23, 7, 2, 2, 1, 4, 2, 2, 3, 4, 4, 1,
  3, 4, 1, 24, 23, 23, 14, 3, 3, 8, 12, 24, 24, 18, 4, 1, 3, 1, 3, 3, 4, 4, 1,
  3, 1, 4, 3, 4, 11, 15, 15, 7, 1, 4, 3, 20, 23, 11, 7, 2, 1, 3, 1, 3, 4, 4, 3,
  2, 2, 3, 4, 2, 1, 18, 4, 3, 2, 2, 4, 3, 8, 12, 18, 2, 4, 4, 3, 3, 1, 4, 2, 1,
  4, 4, 4, 1, 1, 1, 14, 2, 1, 4, 2, 1, 4, 2, 8, 7, 5, 17, 6, 3, 3, 3, 4, 3, 4,
  4, 3, 2, 4, 3, 4, 10, 6, 2, 1, 4, 4, 1, 3, 4, 3, 8, 12, 10, 6, 2, 1, 1, 1, 1,
  2, 1, 4, 2, 1, 1, 24, 18, 1, 2, 4, 3, 3, 5, 6, 5, 13, 9, 11, 7, 3, 4, 1, 3, 1,
  3, 4, 2, 4, 4, 4, 24, 14, 4, 2, 5, 6, 2, 8, 22, 9, 23, 24, 10, 6, 2, 1, 3, 1,
  5, 6, 2, 3, 4, 4, 2, 19, 7, 3, 1, 8, 7, 4, 1, 8, 12, 24, 23, 23, 10, 17, 6, 3,
  1, 8, 7, 1, 3, 3, 3, 1, 1, 2, 4, 2, 2, 3, 3, 4, 3, 20, 24, 23, 23, 23, 23, 18,
  2, 2, 3, 1, 4, 4, 1, 1, 1, 3, 3, 5, 13, 6, 1, 2, 2, 5, 9, 23, 23, 24, 23, 24,
  14, 1, 3, 1, 1, 3, 3, 4, 4, 4, 2, 4, 16, 24, 10, 6, 2, 4, 20, 23, 23, 24, 23,
  23, 24, 14, 2, 4, 2, 4, 5, 6, 4, 3, 1, 3, 1, 20, 23, 24, 10, 6, 3, 8, 12, 24,
  23, 23, 23, 24, 14, 1, 2, 1, 5, 9, 18, 4, 3, 4, 4, 2, 8, 12, 23, 24, 18, 4, 3,
  16, 24, 24, 24, 23, 24, 18, 1, 3, 1, 16, 24, 14, 1, 3, 2, 4, 1, 2, 8, 12, 24,
  14, 4, 1, 8, 15, 12, 24, 23, 11, 7, 2, 1, 2, 16, 23, 18, 1, 4, 2, 3, 4, 3, 2,
  8, 19, 7, 2, 2, 3, 3, 8, 15, 19, 7, 3, 1, 2, 5, 9, 24, 14, 1, 2, 3, 2, 2, 1,
  4, 4, 1, 2, 5, 6, 2, 2, 2, 1, 3, 4, 3, 5, 13, 9, 24, 24, 18, 4, 3, 4, 1, 4, 1,
  3, 2, 5, 13, 9, 14, 3, 1, 3, 2, 4, 4, 5, 21, 19, 12, 24, 11, 7, 1, 2, 3, 2, 1,
  3, 3, 3, 20, 23, 24, 18, 4, 4, 2, 3, 1, 1, 8, 7, 5, 9, 23, 18, 1, 3, 4, 2, 4,
  2, 4, 1, 2, 8, 15, 19, 7, 4, 5, 6, 4, 2, 4, 5, 17, 9, 23, 11, 22, 13, 6, 4, 1,
  3, 2, 2, 4, 4, 3, 2, 1, 4, 2, 8, 7, 4, 2, 3, 16, 24, 23, 11, 7, 16, 23, 18, 3,
  1, 1, 3, 1, 2, 3, 3, 3, 4, 2, 1, 3, 2, 3, 4, 3, 8, 15, 15, 7, 4, 8, 19, 7, 3,
  4, 1, 2, 3, 4, 1, 3, 4, 4, 4, 1, 4, 4, 3, 2, 3, 4, 1, 2, 4, 2, 1, 2, 2, 4, 1,
  4, 2, 3, 2, 1, 4, 2, 2, 1, 2, 2, 2, 4, 3, 3, 2, 3, 3, 2, 3, 2, 4, 1, 3, 1, 1,
  1, 1, 4, 1, 3, 3, 2, 1, 4, 2, 1, 3, 1, 3, 3, 4, 3, 4, 2, 1, 2, 3, 1, 1,
];

// The padding area cannot be travelled to by the avatar
export const GAME_SCENE_PADDING = 50;

// Starting coordinates of buttons on bottom right
export const RIGHT_BUTTONS_START = [1220, 700];

export const BUILD_BUTTON_START = [0, 710];
export const BUILD_BUTTON_END = [90, 800];

export const HOUSE_STRUCT_LEFT = [545, 435];
export const HOUSE_STRUCT_DOWN = [674, 472];
export const HOUSE_STRUCT_RIGHT = [785, 421];
export const HOUSE_STRUCT_UP = [582, 350];
export const HOUSE_STRUCT_IMAGE = [650, 370];
export const BUILD_DIRECTION_MAPPING = {
  0: HOUSE_STRUCT_LEFT,
  1: HOUSE_STRUCT_UP,
  2: HOUSE_STRUCT_RIGHT,
  3: HOUSE_STRUCT_DOWN,
};

const COINS_BUTTON_SIZE = [639, 212];
export const COINS_BUTTON_CENTER = [1475, 50];
export const COINS_BUTTON_START = [
  COINS_BUTTON_CENTER[0] - COINS_BUTTON_SIZE[0] / 2,
  COINS_BUTTON_CENTER[1] - COINS_BUTTON_SIZE[1] / 2,
];
export const COINS_BUTTON_END = [
  COINS_BUTTON_CENTER[0] + COINS_BUTTON_SIZE[0] / 2,
  COINS_BUTTON_CENTER[1] + COINS_BUTTON_SIZE[1] / 2,
];

const AVATAR_PANEL_SIZE = [213.6, 73.2]; // Scaled width, scaled height
export const AVATAR_PANEL_CENTER = [120, 50];
export const AVATAR_PANEL_START = [
  AVATAR_PANEL_CENTER[0] - AVATAR_PANEL_SIZE[0] / 2,
  AVATAR_PANEL_CENTER[1] - AVATAR_PANEL_SIZE[1] / 2,
];
export const AVATAR_PANEL_END = [
  AVATAR_PANEL_CENTER[0] + AVATAR_PANEL_SIZE[0] / 2,
  AVATAR_PANEL_CENTER[1] + AVATAR_PANEL_SIZE[1] / 2,
];

export const THANK_YOU_TEXT =
  'Thank you for helping to build a house for families in \n' +
  'Cambodia! 💖 Click on the panel below to learn more\n' +
  'about the poverty housing situation in Cambodia and' +
  '\nhow you can help!';

export const DEFAULT_SFX_CONFIG = {
  mute: 0,
  volume: 0.8,
  seek: 0,
  loop: false,
  delay: 0,
};

export const QUIZ_WELCOME_TEXT = `Answer some questions related to Habitat for Humanity
to reduce build time by 3 hours!`;
export const QUIZ_ALREADY_DONE_TEXT =
  'You have already done a quiz for today!\nTry again tomorrow!';
export const QUIZ_ALL_COMPLETED =
  "We're out of quizzes for you! Try again next time!";

export const QUIZ_CORRECT =
  'Correct! The build time has been reduced by 3 hours.';
export const QUIZ_WRONG = 'Uh oh! Try again tomorrow!';
