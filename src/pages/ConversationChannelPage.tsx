import {useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { ConversationChannelPageStyle } from '../utils/styles/index';
import { AuthContext } from '../utils/context/AuthContext';
import { getConversationMessages } from '../utils/api';
import { MessageType } from '../utils/types';
import { MessagePanel } from '../components/messages/MessagePanel';

export const ConversationChannelPage = () => {

  const { user } = useContext(AuthContext)
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { id } = useParams();


  useEffect(() => {
    id && getConversationMessages(parseInt(id))
      .then(({data}) => {
        console.log(data);
        setMessages(data);
      })
      .catch((err) => console.log(err))
  }, [id])

  return (
    <ConversationChannelPageStyle>
      <MessagePanel messages={messages} ></MessagePanel>
    </ConversationChannelPageStyle>
  )
}
