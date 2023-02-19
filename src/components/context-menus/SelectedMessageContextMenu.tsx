import { FC, useContext } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../store";
import { deleteMessageshunk } from "../../store/messageSlice";
import { AuthContext } from "../../utils/context/AuthContext";
import { MessageMenuContext } from "../../utils/context/MessageMenuContext";
import { ContextMenu } from "../../utils/styles";

type Props = {
  points: { x: number; y: number };
};

export const SelectedMessageContextMenu: FC<Props> = ({ points }) => {
  const { message } = useContext(MessageMenuContext);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();

  const deleteMessage = () => {
    const conversationId = parseInt(id!);
    dispatch(deleteMessageshunk({ conversationId, messageId: message!.id }));
  };

  return (
    <ContextMenu top={points.x} left={points.y}>
      <ul>
        {message?.author.id === user?.id && (
          <li onClick={deleteMessage}>Delete</li>
        )}

        {message?.author.id === user?.id && <li>Edit</li>}
      </ul>
    </ContextMenu>
  );
};
