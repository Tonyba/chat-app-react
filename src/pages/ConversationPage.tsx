import React, { useEffect, useState, useContext } from "react";
import { Outlet, useParams } from "react-router-dom";
import { ConversationSidebar } from "../components/conversations/ConversationSidebar";
import { Page } from "../utils/styles";
import { ConverstationPanel } from "../components/conversations/ConverstationPanel";
import { MessageEventPayload } from "../utils/types";

// import mockConverstations from '../__mocks__/converstation';
import { Conversation } from "../utils/types";
import { AppDispatch } from "../store";
import { useDispatch, useSelector } from "react-redux";
import {
  addConversation,
  fetchConversationsThunk,
  updateConversation,
} from "../store/conversationSlide";
import { RootState } from "../store/index";
import { SocketContext } from "../utils/context/SocketContext";
import { addMessage, deleteMessage } from "../store/messageSlice";

export const ConversationPage = () => {
  const { id } = useParams();
  const [conversations] = useState<Conversation[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);
  const conversationsState = useSelector(
    (state: RootState) => state.conversation.conversations
  );

  useEffect(() => {
    console.log("fetching conversations in conversation page");
    dispatch(fetchConversationsThunk());
  }, []);

  useEffect(() => {
    socket.emit("onClientConnect", { conversationId: parseInt(id!) });
    socket.on("connected", (data) => {
      console.log("connected to socket");
    });
    socket.on("onMessage", (payload: MessageEventPayload) => {
      console.log("Message Received");
      const { conversation } = payload;

      dispatch(addMessage(payload));
      dispatch(updateConversation(conversation));
    });

    socket.on("onConversation", (payload: Conversation) => {
      console.log("received Conversation Event");
      console.log(payload);
      dispatch(addConversation(payload));
    });

    socket.on("onMessageDelete", (payload) => {
      dispatch(deleteMessage(payload));
    });

    return () => {
      socket.off("connected");
      socket.off("onMessage");
      socket.off("onConversation");
      socket.off("onMessageDelete");
    };
  }, [id]);

  return (
    <Page>
      <ConversationSidebar conversations={conversations} />
      {!id && <ConverstationPanel />}
      <Outlet />
    </Page>
  );
};
