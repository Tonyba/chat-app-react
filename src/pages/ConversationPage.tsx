import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { ConversationSidebar } from '../components/conversations/ConversationSidebar';
import { Page } from '../utils/styles';
import { ConverstationPanel } from '../components/conversations/ConverstationPanel';

// import mockConverstations from '../__mocks__/converstation';
import { getConversations } from '../utils/api';
import { Conversation } from '../utils/types';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { fetchConversationsThunk } from '../store/conversationSlide';

export const ConversationPage = () => {
  const { id } = useParams();
  const [ conversations, setConversations ] = useState<Conversation[]>([])
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    
    dispatch(fetchConversationsThunk())
    
  }, [])
  

  return (
    <Page>
      <ConversationSidebar conversations={conversations}  />
      { !id &&  <ConverstationPanel /> }
      <Outlet />
    </Page>
  );
};
