/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentQuizId: null,
  completedQuizzes: [],
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setCurrentQuiz: (state, action) => {
      state.currentQuizId = action.payload;
    },
    completeQuiz: (state, action) => {
      state.completedQuizzes = [...state.completedQuizzes, action.payload];
    },
  },
});

export const { setCurrentQuiz, completeQuiz } = quizSlice.actions;

export default quizSlice.reducer;
