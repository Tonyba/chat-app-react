import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ConversationChannelPageStyle } from "../utils/styles/index";
import { MessagePanel } from "../components/messages/MessagePanel";
import { SocketContext } from "../utils/context/SocketContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/index";
import { fetchMessagesThunk } from "../store/messageSlice";

export const ConversationChannelPage = () => {
  const socket = useContext(SocketContext);
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
  const [isTyping, setIsTyping] = useState(false);
  const [isRecipientTyping, setIsRecipientTyping] = useState(false);

  useEffect(() => {
    const conversationId = parseInt(id!);
    dispatch(fetchMessagesThunk(conversationId));
  }, [id]);

  useEffect(() => {
    const conversationId = id!;
    socket.emit("onConversationJoin", { conversationId });

    socket.on("userJoin", () => {
      console.log("userJoin");
    });

    socket.on("userLeave", () => {
      console.log("userLeave");
    });

    socket.on("onTypingStart", () => {
      console.log("user is typing");
      setIsRecipientTyping(true);
    });

    socket.on("onTypingStop", () => {
      console.log("user is not typing");
      setIsRecipientTyping(false);
    });

    return () => {
      socket.emit("onConversationLeave", { conversationId });
      socket.off("userJoin");
      socket.off("userLeave");
      socket.off("onTypingStart");
      socket.off("onTypingStop");
    };
  }, [id]);

  const sendTypingStatus = () => {
    console.log("you are typing...");
    if (isTyping) {
      clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          console.log("User stopped typing");
          socket.emit("onTypingStop", { conversationId: id });
          setIsTyping(false);
        }, 2000)
      );
    } else {
      setIsTyping(true);
      socket.emit("onTypingStart", { conversationId: id });
    }
  };

  return (
    <ConversationChannelPageStyle>
      <MessagePanel
        sendTypingStatus={sendTypingStatus}
        isRecipientTyping={isRecipientTyping}
      ></MessagePanel>
    </ConversationChannelPageStyle>
  );
};
