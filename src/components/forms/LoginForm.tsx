import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { InputField, InputContainer, InputLabel, Button } from '../../utils/styles';
import  styles from './index.module.scss';
import { loginUserParams } from '../../utils/types';
import { postLoginUser } from '../../utils/api';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginUserParams>();
  const navigate = useNavigate();

  const onSubmit = async (data: loginUserParams) => {
    console.log(data);
    try {
      await postLoginUser(data);
      navigate('/conversations')
    } catch (error) {
      console.log(error)
    }
    
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <InputLabel htmlFor="email"> Email </InputLabel>
        <InputField
          {...register('email', {
            required: true,
          })}
          type="email"
          id="email"
        />
      </InputContainer>

      <InputContainer className={styles.loginFormPassword}>
        <InputLabel htmlFor="password"> Password </InputLabel>
        <InputField
          {...register('password', {
            required: true,
          })}
          type="password"
          id="password"
        />
      </InputContainer>

      <Button className={styles.button} type="submit"> Login </Button>
      <div className={styles.footerText}>
        <span>Don't have an account? </span>
        <Link to="/register">
          <span>Sign up</span>
        </Link>
      </div>
    </form>
  );
};
