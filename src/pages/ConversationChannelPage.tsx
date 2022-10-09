import userEvent from '@testing-library/user-event';
import React, {useContext} from 'react'
import { useParams } from 'react-router-dom';
import { ConversationChannelPageStyle } from '../utils/styles/index';
import { AuthContext } from '../utils/context/AuthContext';

export const ConversationChannelPage = () => {

  const { user } = useContext(AuthContext)

  return (
    <ConversationChannelPageStyle>
      { user && user.email }</ConversationChannelPageStyle>
  )
}
