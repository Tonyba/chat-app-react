import { InputField, InputContainer, InputLabel, TextField, Button } from '../../utils/styles/index';

import styles from './index.module.scss';
import { useDispatch } from 'react-redux';
import { addConversation, createConversationThunk } from '../../store/conversationSlide';
import { useForm } from 'react-hook-form';
import { CreateConversationParams } from '../../utils/types';
import { AppDispatch } from '../../store';
import { Dispatch, FC }  from 'react'
import React from 'react';

type Props = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const CreateConversationForm: FC<Props> = ({ setShowModal }) => {

  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, formState: { errors } } = useForm<CreateConversationParams>({});

  const onSubmit = (data: CreateConversationParams) => {
        console.log(data);
        dispatch(createConversationThunk(data))
        .then((data) => {
            console.log(data);
            setShowModal(false);
            
        })
        .catch((err) => console.log(err));
  }
  

  return (
    <form className={styles.createConversationForm} onSubmit={handleSubmit(onSubmit)} >
        <section>
            <InputContainer backgroundColor='#161616' >
                <InputLabel>Recipient</InputLabel>
                <InputField  {...register('email', { required: 'Email is required' })} />
            </InputContainer>
        </section>
        <section className={styles.message} >
            <InputContainer backgroundColor='#161616' >
                <InputLabel>Message (optional)</InputLabel>
                <TextField {...register('message', { required: 'Message is required' })} />
            </InputContainer>
        </section>    

        <Button type='submit'>Create Conversation</Button>
        
    </form>
  )
}
