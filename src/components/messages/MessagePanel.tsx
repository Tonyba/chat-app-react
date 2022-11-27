import { MessagePanelStyle } from "../../utils/styles"
import { MessageContainer } from "./MessageContainer"
import { MessageInputField } from './MessageInputField';
import {FC, useState} from 'react';
import { MessagePanelBody } from '../../utils/styles/index';
import { MessagePanelHeader } from './MessagePanelHeader';
import { useParams } from "react-router-dom";
import { postNewMessage } from '../../utils/api';


export const MessagePanel = () => {

    const [content, setContent] = useState('');
    const { id } = useParams();
    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!id || !content) return;
        const conversationId = parseInt(id);

        try {
            await postNewMessage({ conversationId, content })
            setContent('');
        } catch (error) {
            console.log(error);
        }
    };

    return <>
        <MessagePanelStyle>
            <MessagePanelHeader/>
            <MessagePanelBody>
                <MessageContainer />
                <MessageInputField content={content} setContent={setContent} sendContent={sendMessage} />
            </MessagePanelBody>
        </MessagePanelStyle>
    </>
}