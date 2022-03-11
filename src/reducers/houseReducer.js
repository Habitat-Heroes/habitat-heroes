/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const HouseType = {
  basic_hut: 'basic_hut',
  brick_house: 'brick_house',
  concrete_house: 'concrete_house'
};
export const UserAction = {
  build: 'build',
  remove: 'remove',
  upgrade: 'upgrade'
};
const initialState = {
  total_house: 0,
  basic_hut: 0,
  brick_house: 0,
  concrete_house: 0
};

const houseSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {
    updateHouse: (state, action) => {
      // payload is { houseType: HouseType, userAction: UserAction, (optional) upgradeHouseType: HouseType }
      const {payload} = action;
        switch(payload.userAction) {
          case UserAction.build:
            state[payload.houseType] += 1;
            state.total_house += 1;
            break;
          case UserAction.remove:
            state[payload.houseType] -= 1;
            state.total_house -= 1;
            break;
          case UserAction.upgrade:
            state[payload.houseType] -= 1;
            state[payload.upgradeHouseType] += 1;
            break;
          default:
            break;
        }
    },
    resetHouses: (state) => {
      state.total_house = 0;
      state.basic_hut = 0;
      state.brick_house = 0;
      state.concrete_house = 0;
    }
  }
});
export const { updateHouse, resetHouses } = houseSlice.actions;

export default houseSlice.reducer;
