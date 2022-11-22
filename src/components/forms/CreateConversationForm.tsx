import React from 'react'
import { InputField, InputContainer, InputLabel, TextField, Button } from '../../utils/styles/index';

import styles from './index.module.scss';
import { useDispatch } from 'react-redux';
import { addConversation } from '../../store/conversationSlide';

export const CreateConversationForm = () => {

  const dispatch = useDispatch();

  return (
    <form className={styles.createConversationForm} >
        <section>
            <InputContainer backgroundColor='#161616' >
                <InputLabel>Recipient</InputLabel>
                <InputField />
            </InputContainer>
        </section>
        <section className={styles.message} >
            <InputContainer backgroundColor='#161616' >
                <InputLabel>Message (optional)</InputLabel>
                <TextField />
            </InputContainer>
        </section>    

        <Button onClick={(e) =>{ 
            e.preventDefault();        
        }} >Create Conversation</Button>
        
    </form>
  )
}
