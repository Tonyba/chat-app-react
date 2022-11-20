import {Dispatch, FC, SetStateAction} from 'react'
import { MessageInputContainer, MessageInput } from '../../utils/styles/index';

type Props = {
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
    sendContent: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const MessageInputField: FC<Props> = ({content, setContent, sendContent}) => {
    return <MessageInputContainer>
        <form onSubmit={sendContent}>
            <MessageInput value={content} onChange={e => setContent(e.target.value)} />
        </form>
    </MessageInputContainer>
}