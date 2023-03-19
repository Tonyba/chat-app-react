import { Dispatch, FC, SetStateAction } from "react";
import { MessageInputContainer, MessageInput } from "../../utils/styles/index";
import styles from "./index.module.scss";

type Props = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  sendContent: (e: React.FormEvent<HTMLFormElement>) => void;
  sendTypingStatus: () => void;
};

export const MessageInputField: FC<Props> = ({
  content,
  setContent,
  sendContent,
  sendTypingStatus,
}) => {
  const updateContent = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);

  return (
    <>
      <MessageInputContainer>
        <form onSubmit={sendContent} className={styles.form}>
          <MessageInput
            value={content}
            onChange={updateContent}
            onKeyDown={sendTypingStatus}
          />
        </form>
      </MessageInputContainer>
    </>
  );
};
