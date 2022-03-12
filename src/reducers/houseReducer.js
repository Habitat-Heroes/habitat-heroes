/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const HouseType = {
  basic_hut: 'basic_hut',
  brick_house: 'brick_house',
  concrete_house: 'concrete_house',
};
export const BuildTime = {
  basic_hut: 129600,
  brick_house: 259200,
  concrete_house: 518400,
};
export const UserAction = {
  build: 'build',
  remove: 'remove',
  upgrade: 'upgrade',
};
const initialState = {
  total_house: 0,
  basic_hut: 0,
  brick_house: 0,
  concrete_house: 0,
  building: false,
  buildTime: 0,
  startBuildTime: 0,
};

const houseSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {
    updateHouse: (state, action) => {
      // payload is { houseType: HouseType, userAction: UserAction, (optional) upgradeHouseType: HouseType }
      const { payload } = action;
      switch (payload.userAction) {
        case UserAction.build:
          state[payload.houseType] += 1;
          state.total_house += 1;
          state.startBuildTime = new Date().getTime();
          state.buildTime = BuildTime[payload.houseType];
          state.building = true;
          break;
        case UserAction.remove:
          state[payload.houseType] -= 1;
          state.total_house -= 1;
          break;
        case UserAction.upgrade:
          state[payload.houseType] -= 1;
          state[payload.upgradeHouseType] += 1;
          state.startBuildTime = new Date().getTime();
          state.buildTime = BuildTime[payload.upgradeHouseType];
          state.building = true;
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
      state.building = false;
      state.buildTime = 0;
      state.startBuildTime = 0;
    },
  },
});
export const { updateHouse, resetHouses } = houseSlice.actions;

export default houseSlice.reducer;
