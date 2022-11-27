import {useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { ConversationChannelPageStyle } from '../utils/styles/index';
import { MessageType, MessageEventPayload } from '../utils/types';
import { MessagePanel } from '../components/messages/MessagePanel';
import { SocketContext } from '../utils/context/SocketContext';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/index';
import { addMessage, fetchMessagesThunk } from '../store/messageSlice';
import { updateConversation } from '../store/conversationSlide';

export const ConversationChannelPage = () => {

  const socket = useContext(SocketContext);
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  

  useEffect(() => {
    const conversationId = parseInt(id!);
    dispatch(fetchMessagesThunk(conversationId));
  }, [id])
  


  useEffect(() => {
    socket.on('connected', () => console.log('Connected'));
    socket.on('onMessage', (payload: MessageEventPayload) => {
      console.log('Message Received');
      const { conversation } = payload;

      dispatch(addMessage(payload));
      dispatch(updateConversation(conversation))
    });

    return () => {
      socket.off('connected');
      socket.off('onMessage');
    }
  }, []);
  

  return (
    <ConversationChannelPageStyle>
      <MessagePanel ></MessagePanel>
    </ConversationChannelPageStyle>
  )
}
