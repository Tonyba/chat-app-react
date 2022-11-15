import { MessageContainerStyle, MessageItemContent, MessageItemDetails, MessageItemHeader } from "../../utils/styles"
import { MessageType, User } from '../../utils/types';
import { FC, useContext, useEffect } from 'react';
import { MessageItemContainer, MessageItemAvatar } from '../../utils/styles/index';
import { formatRelative } from "date-fns";
import { AuthContext } from '../../utils/context/AuthContext';


type Props = {
  messages: MessageType[];
}

type FormattedMessageProps = {
  user?: User;
  message: MessageType;
}

export const  FormattedMessage: FC<FormattedMessageProps> = ({ user, message }) => {
  return (
    <MessageItemContainer>
    <MessageItemAvatar />
    <MessageItemDetails>
      <MessageItemHeader>
        <span className="author" style={{
          color: user?.id === message.author.id ? '#fff' : '#2608cf'
        }}>
         {message.author.firstName} {message.author.lastName}
        </span>
        <span className="time" >
          { formatRelative(new Date(message.createdAt), new Date())}
        </span>
      </MessageItemHeader>
      <MessageItemContent>
        {message.content}
      </MessageItemContent>
    </MessageItemDetails>
  </MessageItemContainer>
  );
}


export const MessageContainer: FC<Props> = ({ messages }) => {

  const { user } = useContext(AuthContext);

  const formattedMessages = () => {
    return messages.map((m , index, arr) => {
      console.log(index);
      const currentMessage= arr[index];
      const nextMessage = arr[index + 1];

      if(arr.length === index + 1) {
        return <FormattedMessage user={user} message={m} />
      }

      if(currentMessage.author.id === nextMessage.author.id) {
        return (
          <MessageItemContainer>
             <MessageItemContent padding="0 0 0 70px">
              {m.content}
            </MessageItemContent>
        </MessageItemContainer>
        );
      } else {
        return <FormattedMessage user={user} message={m} />
      }
  
    });
  }

  useEffect(() => {
    formattedMessages()
  });

  return (
    <MessageContainerStyle>
      {formattedMessages()}
      {/* {messages.map((m, index, messagesArray) => (
        <MessageItemContainer>
          <MessageItemAvatar />
          <MessageItemDetails>
            <MessageItemHeader>
              <span className="author" style={{
                color: user?.id === m.author.id ? '#fff' : '#2608cf'
              }}>
               {m.author.firstName} {m.author.lastName}
              </span>
              <span className="time" >
                { formatRelative(new Date(m.createdAt), new Date())}
              </span>
            </MessageItemHeader>
            <MessageItemContent>
              {m.content}
            </MessageItemContent>
          </MessageItemDetails>
        </MessageItemContainer>
      ))} */}

    </MessageContainerStyle>
  )
}
