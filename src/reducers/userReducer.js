/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  donations: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    addDonation: (state, action) => {
      state.donations += action.payload;
    },
  },
});

export const { setName, addDonation } = userSlice.actions;

export default userSlice.reducer;
