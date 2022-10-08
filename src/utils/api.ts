import axios, { AxiosRequestConfig } from 'axios';
import { createUserParams, loginUserParams } from './types';

const API_URL = process.env.REACT_APP_API_URL;
const config: AxiosRequestConfig = { withCredentials: true };

export const postRegisterUser = (data: createUserParams) => axios.post(`${API_URL}/auth/register`, data, config);

export const postLoginUser = (data: loginUserParams) => axios.post(`${API_URL}/auth/login`, data, config);

export const getAuthUser = () => axios.get(`${API_URL}/auth/status`, config);
