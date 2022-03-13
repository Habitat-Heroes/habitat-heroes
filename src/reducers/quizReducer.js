/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentQuizId: null,
  completedQuizzes: [],
  lastCompletionTime: null,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setCurrentQuiz: (state, action) => {
      state.currentQuizId = action.payload;
    },
    completeQuiz: (state) => {
      state.completedQuizzes = [...state.completedQuizzes, state.currentQuizId];
      state.currentQuizId = null;
      state.lastCompletionTime = new Date().getTime();
    },
  },
});

export const { setCurrentQuiz, completeQuiz } = quizSlice.actions;

export default quizSlice.reducer;
