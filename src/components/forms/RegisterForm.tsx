import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { InputField, InputContainer, InputLabel, Button } from '../../utils/styles';

import  styles from './index.module.scss';
import { postRegisterUser } from '../../utils/api';
import { createUserParams } from '../../utils/types';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserParams>();

  console.log(errors);
  const onSubmit = async (data: createUserParams) => {
    console.log(data);
    try {
      await postRegisterUser(data);
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <form className={styles.form}  onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <InputLabel htmlFor="email">Email</InputLabel>
        <InputField
          {...register('email', {
            required: 'Email is required',
          })}
          type="email"
          id="email"
        />
      </InputContainer>

      <section className={styles.nameFieldRow} >
        <InputContainer>
          <InputLabel htmlFor="firstName"> First Name </InputLabel>
          <InputField
            {...register('firstName', {
              required: 'First name is required',
            })}
            type="text"
            id="firstName"
          />
        </InputContainer>

        <InputContainer>
          <InputLabel htmlFor="lastName"> LastName </InputLabel>
          <InputField
            {...register('lastName', {
              required: 'Last name is required',
            })}
            type="text"
            id="lastName"
          />
        </InputContainer>
      </section>

      <InputContainer>
        <InputLabel htmlFor="password"> Password </InputLabel>
        <InputField
          {...register('password', {
            required: 'Password is required',
          })}
          type="password"
          id="password"
        />
      </InputContainer>

      <Button className={styles.form}  type="submit"> Create my Account </Button>
      <div className={styles.footerText}>
        <span>Already have an account? </span>
        <Link to="/login">
          <span>Login</span>
        </Link>
      </div>
    </form>
  );
};
