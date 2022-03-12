import { combineReducers } from '@reduxjs/toolkit';

import coinsReducer from './coinsReducer';
import houseReducer from './houseReducer';
import inventoryReducer from './inventoryReducer';
import userReducer from './userReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  coins: coinsReducer,
  inventory: inventoryReducer,
  houses: houseReducer,
});
