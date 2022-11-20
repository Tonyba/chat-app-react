import { createSlice } from '@reduxjs/toolkit';
import { Conversation } from '../utils/types';
import { PayloadAction } from '@reduxjs/toolkit';

export interface ConversationsState {
  conversations: Conversation[];
}

const initialState: ConversationsState = {
  conversations: [],
};

export const conversationSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations.push(action.payload);
    },
  },
});

export const { addConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
