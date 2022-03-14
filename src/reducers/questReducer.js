/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hasBuiltHouse: false,
  hasPurchasedFromShop: false,
  hasSharedOnSocialMedia: false,
};

const questSlice = createSlice({
  name: 'quest',
  initialState,
  reducers: {
    updateQuests: (state, action) => {
      state.hasBuiltHouse = action.payload.hasBuiltHouse ?? state.hasBuiltHouse;
      state.hasPurchasedFromShop =
        action.payload.hasPurchasedFromShop ?? state.hasPurchasedFromShop;
      state.hasSharedOnSocialMedia =
        action.payload.hasSharedOnSocialMedia ?? state.hasSharedOnSocialMedia;
    },
  },
});

export const { updateQuests } = questSlice.actions;

export default questSlice.reducer;
