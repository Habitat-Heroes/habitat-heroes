/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const mapItemsSlice = createSlice({
  name: 'mapItems',
  initialState,
  reducers: {
    addToMap: (state, action) => {
      const coordX = action.payload.coordinates[0];
      const coordY = action.payload.coordinates[1];
      state[[coordX, coordY]] = {
        coordinates: action.payload.coordinates,
        depth: action.payload.depth,
        spritesheet: action.payload.spritesheet,
        frame: action.payload.frame,
      };
    },
  },
});

export const { addToMap } = mapItemsSlice.actions;

export default mapItemsSlice.reducer;
