import axios, { AxiosRequestConfig } from 'axios';
import { createUserParams, loginUserParams, User, Conversation } from './types';

const API_URL = process.env.REACT_APP_API_URL;
const config: AxiosRequestConfig = { withCredentials: true };

export const postRegisterUser = (data: createUserParams) => axios.post(`${API_URL}/auth/register`, data, config);

export const postLoginUser = (data: loginUserParams) => axios.post(`${API_URL}/auth/login`, data, config);

export const getAuthUser = () => axios.get<User>(`${API_URL}/auth/status`, config);

export const getConversations = () => axios.get<Conversation[]>(`${API_URL}/conversations`, config);

export const getConversationMessages = (id: number) => axios.get(`${API_URL}/messages/${id}`, config);
