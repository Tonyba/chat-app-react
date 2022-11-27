import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getConversationMessages } from '../utils/api';
import { ConversationMessage, MessageEventPayload } from '../utils/types';

export interface MessagesState {
  messages: ConversationMessage[];
  loading: boolean;
}

const initialState: MessagesState = {
  messages: [],
  loading: false,
};

export const fetchMessagesThunk = createAsyncThunk('messages/fetch', async (id: number) => {
  return getConversationMessages(id);
});

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageEventPayload>) => {
      console.log(state);
      console.log(action);
      const { conversation, ...message } = action.payload;

      const converstationMessage = state.messages.find((cm) => cm.id === conversation.id);
      converstationMessage?.messages.unshift(message);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessagesThunk.fulfilled, (state, action) => {
      const { id, messages } = action.payload.data;
      const index = state.messages.findIndex((cm) => cm.id === id);
      const exists = state.messages.find((cm) => cm.id === id);
      if (exists) {
        console.log('exists');
        state.messages[index] = action.payload.data;
      } else {
        state.messages.push(action.payload.data);
      }
      state.loading = false;
    });
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
