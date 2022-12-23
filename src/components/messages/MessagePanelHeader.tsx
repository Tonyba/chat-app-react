import { useParams } from 'react-router-dom';
import { MessagePanelHeaderStyle } from '../../utils/styles/index';
import { useContext } from 'react';
import { AuthContext } from '../../utils/context/AuthContext';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { selectConversationById } from '../../store/conversationSlide';

export const MessagePanelHeader = () => {
  const {id} = useParams();
  const { user } = useContext(AuthContext);
  const conversation = useSelector(
    (state: RootState) => selectConversationById(state, parseInt(id!))
  )

  const displayName = (user?.id === conversation?.creator.id)  
    ? `${conversation?.recipient.firstName} ${conversation?.recipient.lastName}` 
    : `${conversation?.creator.firstName} ${conversation?.creator.lastName}`  ;

  return (
    <MessagePanelHeaderStyle>{displayName}</MessagePanelHeaderStyle>
  )
}
