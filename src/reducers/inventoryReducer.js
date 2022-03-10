/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {};  // { itemID: count }

const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        addToInventory: (state, action) => {
            // payload is { itemID: count }
            Object.entries(action.payload).forEach(([itemID, count]) => {
                state[itemID] = (state?.[itemID] ?? 0) + count;
            });
        },
        removeFromInventory: (state, action) => {
            // payload is { itemID: count }
            Object.entries(action.payload).forEach(([itemID, count]) => {
                state[itemID] = (state?.[itemID] ?? 0) - count;
                if (state[itemID] <= 0) {
                    delete state[itemID];
                }
            });
        }
    }
});

export const { addToInventory, removeFromInventory } = inventorySlice.actions;

export default inventorySlice.reducer;
