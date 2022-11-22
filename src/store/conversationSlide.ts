import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Conversation, CreateConversationParams } from '../utils/types';
import { PayloadAction } from '@reduxjs/toolkit';
import { getConversations } from '../utils/api';

export interface ConversationsState {
  conversations: Map<number, Conversation>;
}

const initialState: ConversationsState = {
  conversations: new Map(),
};

export const fetchConversationsThunk = createAsyncThunk('conversations/fetch', async () => {
  return getConversations();
});

export const conversationSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<Conversation>) => {
      console.log('add conversation');
      // state.conversations.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConversationsThunk.fulfilled, (state, action) => {
      action.payload.data.forEach((conversation) => state.conversations.set(conversation.id, conversation));
    });
  },
});

export const { addConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
