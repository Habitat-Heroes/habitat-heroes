import { combineReducers } from '@reduxjs/toolkit';

import coinsReducer from './coinsReducer';
import houseReducer from './houseReducer';
import inventoryReducer from './inventoryReducer';
import mapItemsReducer from './mapItemsReducer';
import quizReducer from './quizReducer';
import userReducer from './userReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  coins: coinsReducer,
  inventory: inventoryReducer,
  houses: houseReducer,
  quiz: quizReducer,
  mapItems: mapItemsReducer,
});
