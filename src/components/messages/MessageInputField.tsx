import {Dispatch, FC, SetStateAction} from 'react'
import { MessageInputContainer, MessageInput } from '../../utils/styles/index';
import styles from './index.module.scss';

type Props = {
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
    sendContent: (e: React.FormEvent<HTMLFormElement>) => void;
    sendTypingStatus: () => void
}

export const MessageInputField: FC<Props> = ({content, setContent, sendContent, sendTypingStatus}) => {
    return <>
    <div>Is Typing...</div>
     <MessageInputContainer>
        
        <form onSubmit={sendContent} className={styles.form} >
            <MessageInput value={content} onChange={e => setContent(e.target.value)} 
            onKeyDown={sendTypingStatus}/>
        </form>             
     </MessageInputContainer>
    </>
}