/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const mapItemsSlice = createSlice({
  name: 'mapItems',
  initialState,
  reducers: {
    addToMap: (state, action) => {
      state.items = [
        ...state.items,
        {
          displayX: action.payload.displayX,
          displayY: action.payload.displayY,
          depth: action.payload.depth,
          spritesheet: action.payload.spritesheet,
          frame: action.payload.frame,
          cellsOccupied: action.payload.cellsOccupied,
        },
      ];
    },
  },
});

export const { addToMap } = mapItemsSlice.actions;

export default mapItemsSlice.reducer;
