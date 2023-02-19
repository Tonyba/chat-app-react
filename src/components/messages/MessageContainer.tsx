import {
  MessageContainerStyle,
  MessageItemContent,
  MessageItemDetails,
  MessageItemHeader,
} from "../../utils/styles";
import { MessageType, User } from "../../utils/types";
import { FC, useContext, useEffect, useState } from "react";
import {
  MessageItemContainer,
  MessageItemAvatar,
} from "../../utils/styles/index";
import { formatRelative } from "date-fns";
import { AuthContext } from "../../utils/context/AuthContext";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { useParams } from "react-router-dom";
import { MessageMenuContext } from "../../utils/context/MessageMenuContext";
import { SelectedMessageContextMenu } from "../context-menus/SelectedMessageContextMenu";

type FormattedMessageProps = {
  user?: User;
  message: MessageType;
  key: number;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const FormattedMessage: FC<FormattedMessageProps> = ({
  user,
  message,
  onContextMenu,
}) => {
  return (
    <MessageItemContainer onContextMenu={onContextMenu}>
      <MessageItemAvatar />
      <MessageItemDetails>
        <MessageItemHeader>
          <span
            className="author"
            style={{
              color: user?.id === message.author.id ? "#fff" : "#2608cf",
            }}
          >
            {message.author.firstName} {message.author.lastName}
          </span>
          <span className="time">
            {formatRelative(new Date(message.createdAt), new Date())}
          </span>
        </MessageItemHeader>
        <MessageItemContent padding="8px 0 0 0">
          {message.content}
        </MessageItemContent>
      </MessageItemDetails>
    </MessageItemContainer>
  );
};

export const MessageContainer = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });

  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [selectedMessage, setSelectedMessage] = useState<MessageType>();

  const conversationMessages =
    useSelector((state: RootState) => state.messages.messages) || [];

  const onContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    message: MessageType
  ) => {
    e.preventDefault();
    setShowMenu(true);
    setPoints({ x: e.pageX, y: e.pageY });
    setSelectedMessage(message);
  };

  useEffect(() => {
    const handleCLick = () => setShowMenu(false);
    window.addEventListener("click", handleCLick);
    return () => window.removeEventListener("click", handleCLick);
  }, []);

  const formatMessages = () => {
    const msgs = conversationMessages.find((cm) => cm.id === parseInt(id!));
    if (!msgs) return [];
    return msgs?.messages?.map((m, index, arr) => {
      const nextIndex = index + 1;
      const currentMessage = arr[index];
      const nextMessage = arr[nextIndex];
      if (arr.length === nextIndex)
        return (
          <FormattedMessage
            onContextMenu={(e) => onContextMenu(e, m)}
            key={m.id}
            user={user}
            message={m}
          />
        );
      if (currentMessage.author.id === nextMessage.author.id) {
        return (
          <MessageItemContainer
            key={m.id}
            onContextMenu={(e) => onContextMenu(e, m)}
          >
            <MessageItemContent padding="0 0 0 70px">
              {m.content}
            </MessageItemContent>
          </MessageItemContainer>
        );
      }
      return (
        <FormattedMessage
          onContextMenu={(e) => onContextMenu(e, m)}
          key={m.id}
          user={user}
          message={m}
        />
      );
    });
  };

  useEffect(() => {
    formatMessages();
  });

  return (
    <MessageMenuContext.Provider
      value={{ message: selectedMessage, setMessage: setSelectedMessage }}
    >
      <MessageContainerStyle>
        <>{formatMessages()}</>
        {showMenu && <SelectedMessageContextMenu points={points} />}
      </MessageContainerStyle>
    </MessageMenuContext.Provider>
  );
};
