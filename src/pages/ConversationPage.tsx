import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { ConversationSidebar } from '../components/conversations/ConversationSidebar';
import { Page } from '../utils/styles';
import { ConverstationPanel } from '../components/conversations/ConverstationPanel';

import mockConverstations from '../__mocks__/converstation';

export const ConversationPage = () => {
  const { id } = useParams();

  return (
    <Page>
      <ConversationSidebar conversations={mockConverstations}  />
      { !id &&  <ConverstationPanel /> }
      <Outlet />
    </Page>
  );
};
