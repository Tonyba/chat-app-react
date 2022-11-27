import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Conversation } from '../utils/types';
import { PayloadAction } from '@reduxjs/toolkit';
import { getConversations } from '../utils/api';

export interface ConversationsState {
  conversations: Conversation[];
  loading: boolean;
}

const initialState: ConversationsState = {
  conversations: [],
  loading: false,
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
    updateConversation: (state, action: PayloadAction<Conversation>) => {
      console.log('Inside updateConversation');
      console.log(action.payload);
      const conversation = action.payload;
      const index = state.conversations.findIndex((c) => c.id === conversation.id);

      state.conversations.splice(index, 1);
      state.conversations.unshift(conversation);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversationsThunk.fulfilled, (state, action) => {
        state.conversations = action.payload.data;
        state.loading = false;
      })

      .addCase(fetchConversationsThunk.pending, (state, action) => {
        state.loading = true;
      });
  },
});

export const { addConversation, updateConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
