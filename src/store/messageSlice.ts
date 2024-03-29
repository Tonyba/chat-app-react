import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteMessage as deleteMessageAPI,
  getConversationMessages,
} from "../utils/api";
import {
  ConversationMessage,
  DeleteMessageParams,
  DeleteMessageResponse,
  MessageEventPayload,
} from "../utils/types";

export interface MessagesState {
  messages: ConversationMessage[];
  loading: boolean;
}

const initialState: MessagesState = {
  messages: [],
  loading: false,
};

export const fetchMessagesThunk = createAsyncThunk(
  "messages/fetch",
  async (id: number) => {
    return getConversationMessages(id);
  }
);

export const deleteMessageshunk = createAsyncThunk(
  "messages/delete",
  async (params: DeleteMessageParams) => {
    return deleteMessageAPI(params);
  }
);

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageEventPayload>) => {
      console.log(state);
      console.log(action);
      const { conversation, message } = action.payload;
      const converstationMessage = state.messages.find(
        (cm) => cm.id === conversation.id
      );

      converstationMessage?.messages.unshift(message);
    },
    deleteMessage: (state, action: PayloadAction<DeleteMessageResponse>) => {
      const { payload } = action;
      const converstationMessages = state.messages.find(
        (cm) => cm.id === payload.conversationId
      );

      if (!converstationMessages) return;

      const messageIndex = converstationMessages?.messages.findIndex(
        (m) => m.id === payload.messageId
      );

      converstationMessages?.messages.splice(messageIndex, 1);
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
        const { id, messages } = action.payload.data;
        const index = state.messages.findIndex((cm) => cm.id === id);
        const exists = state.messages.find((cm) => cm.id === id);
        if (exists) {
          console.log("exists");
          state.messages[index] = action.payload.data;
        } else {
          state.messages.push(action.payload.data);
        }
        state.loading = false;
      })
      .addCase(deleteMessageshunk.fulfilled, (state, action) => {
        const { data } = action.payload;
        const converstationMessages = state.messages.find(
          (cm) => cm.id === data.conversationId
        );

        if (!converstationMessages) return;

        const messageIndex = converstationMessages?.messages.findIndex(
          (m) => m.id === data.messageId
        );

        converstationMessages?.messages.splice(messageIndex, 1);
      });
  },
});

export const { addMessage, deleteMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
