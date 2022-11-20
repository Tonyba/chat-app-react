import { configureStore } from '@reduxjs/toolkit';
import conversationReducer from './conversationSlide';

export const store = configureStore({
  reducer: {
    conversation: conversationReducer,
  },
});
