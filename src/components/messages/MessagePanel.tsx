import { MessagePanelStyle } from "../../utils/styles"
import { MessageContainer } from "./MessageContainer"
import { MessageInputField } from './MessageInputField';
import { MessageType } from '../../utils/types';
import {FC} from 'react';
import { MessagePanelBody } from '../../utils/styles/index';
import { MessagePanelHeader } from './MessagePanelHeader';

type Props = {
    messages: MessageType[];
}

export const MessagePanel: FC<Props> = ({ messages }) => {
    return <>
        <MessagePanelStyle>
            <MessagePanelHeader/>
            <MessagePanelBody>
                <MessageContainer messages={messages} />
                <MessageInputField />
            </MessagePanelBody>
        </MessagePanelStyle>
    </>
}