import { MessagePanelStyle, MessageTypingStatus } from "../../utils/styles";
import { MessageContainer } from "./MessageContainer";
import { MessageInputField } from "./MessageInputField";
import { FC, useState, useContext } from "react";
import { MessagePanelBody } from "../../utils/styles/index";
import { MessagePanelHeader } from "./MessagePanelHeader";
import { useParams } from "react-router-dom";
import { postNewMessage } from "../../utils/api";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { selectConversationById } from "../../store/conversationSlide";
import { getOtherUserFromConversation } from "../../utils/helpers";
import { AuthContext } from "../../utils/context/AuthContext";

type Props = {
  sendTypingStatus: () => void;
  isRecipientTyping: boolean;
};

export const MessagePanel: FC<Props> = ({
  sendTypingStatus,
  isRecipientTyping,
}) => {
  const [content, setContent] = useState("");
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const conversation = useSelector((state: RootState) =>
    selectConversationById(state, parseInt(id!))
  );

  const recipient = getOtherUserFromConversation(user, conversation);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id || !content) return;
    const conversationId = parseInt(id);

    try {
      await postNewMessage({ conversationId, content });
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MessagePanelStyle>
        <MessagePanelHeader />
        <MessagePanelBody isTyping={isRecipientTyping}>
          <MessageContainer />

          <MessageInputField
            content={content}
            setContent={setContent}
            sendContent={sendMessage}
            sendTypingStatus={sendTypingStatus}
          />
          <MessageTypingStatus>
            {isRecipientTyping ? `${recipient?.firstName} is typing...` : ""}
          </MessageTypingStatus>
        </MessagePanelBody>
      </MessagePanelStyle>
    </>
  );
};
