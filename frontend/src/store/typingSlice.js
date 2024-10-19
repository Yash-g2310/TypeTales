// In your typingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const typingSlice = createSlice({
  name: 'typing',
  initialState: {
    speed: 0,
    accuracy: 0,
  },
  reducers: {
    setTypingSpeed: (state, action) => {
      state.speed = action.payload;
    },
    setAccuracy: (state, action) => {
      state.accuracy = action.payload; // Update accuracy
    },
    resetTypingStats: (state) => {
      state.speed = 0;
      state.accuracy = 0; // Reset accuracy
    },
  },
});

export const { setTypingSpeed, setAccuracy, resetTypingStats } = typingSlice.actions;
export default typingSlice.reducer;
