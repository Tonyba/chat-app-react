import { FC, useState, useContext } from 'react';
import { ConversationSidebarStyle, ConversationSidebarItem, ConversationSidebarContainer, ConversationSidebarHeader } from '../../utils/styles/index';
import { TbEdit } from 'react-icons/tb';

import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom';
import { CreateConversationModal } from '../modals/CreateConversationModal';
import { Conversation } from '../../utils/types';
import { AuthContext } from '../../utils/context/AuthContext';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/index';

type Props = {
  conversations: Conversation[];
}

export const ConversationSidebar: FC<Props> = () => {

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);
  const conversations = useSelector((state: RootState) => state.conversation.conversations);
  const dispatch = useDispatch();

  const getDisplayUser = (conversation: Conversation) => {
    return conversation.creator.id === user?.id ? conversation.recipient : conversation.creator ;
  }

  return <>
    { showModal && <CreateConversationModal setShowModal={setShowModal} /> }
    <ConversationSidebarStyle>
    <ConversationSidebarHeader>
      <h1>Converstations</h1>
      <div onClick={() => setShowModal(!showModal)} > 
        <TbEdit  size={40} />
      </div>
      
    </ConversationSidebarHeader>
    <ConversationSidebarContainer>
      { conversations.map((conversation) => (
        <ConversationSidebarItem key={conversation.id} onClick={ () => navigate(`/conversations/${conversation.id}`) } > 
          <div className={styles.conversationAvatar}></div>
       
          
          <div>
            <span className={styles.conversationName} > 
              {getDisplayUser(conversation).firstName + ' '} 
              {getDisplayUser(conversation).lastName} 
            </span>

            <span className={styles.conversationMessage}>
              {conversation.lastMessageSent?.content}
            </span>
            
          </div> 
        </ConversationSidebarItem>
      )) }
    </ConversationSidebarContainer>
        
  </ConversationSidebarStyle>;
  </>
};
