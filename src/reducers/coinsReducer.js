/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    coins: 2000,
};

const coinsSlice = createSlice({
    name: 'coins',
    initialState,
    reducers: {
        increaseByAmount: (state, action) => {
            state.coins += action.payload;
        },
        decreaseByAmount: (state, action) => {
            state.coins -= action.payload;
        }
    }
});

export const { increaseByAmount, decreaseByAmount } = coinsSlice.actions;

export default coinsSlice.reducer;
