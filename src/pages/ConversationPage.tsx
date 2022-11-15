import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { ConversationSidebar } from '../components/conversations/ConversationSidebar';
import { Page } from '../utils/styles';
import { ConverstationPanel } from '../components/conversations/ConverstationPanel';

// import mockConverstations from '../__mocks__/converstation';
import { getConversations } from '../utils/api';
import { Conversation } from '../utils/types';

export const ConversationPage = () => {
  const { id } = useParams();
  const [ conversations, setConversations ] = useState<Conversation[]>([])

  useEffect(() => {
    
    getConversations()
      .then(({data}) => setConversations(data))
      .catch((err) => console.log(err))
  }, [])
  

  return (
    <Page>
      <ConversationSidebar conversations={conversations}  />
      { !id &&  <ConverstationPanel /> }
      <Outlet />
    </Page>
  );
};
