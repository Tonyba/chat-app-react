import axios, { AxiosRequestConfig } from "axios";
import {
  createUserParams,
  loginUserParams,
  User,
  Conversation,
  CreateMessageParams,
  FetchMessagePayload,
  CreateConversationParams,
  DeleteMessageParams,
  DeleteMessageResponse,
} from "./types";

const API_URL = process.env.REACT_APP_API_URL;
const config: AxiosRequestConfig = { withCredentials: true };

export const postRegisterUser = (data: createUserParams) =>
  axios.post(`${API_URL}/auth/register`, data, config);

export const postLoginUser = (data: loginUserParams) =>
  axios.post(`${API_URL}/auth/login`, data, config);

export const getAuthUser = () =>
  axios.get<User>(`${API_URL}/auth/status`, config);

export const getConversations = () =>
  axios.get<Conversation[]>(`${API_URL}/conversations`, config);

export const getConversationMessages = (id: number) =>
  axios.get<FetchMessagePayload>(
    `${API_URL}/conversations/${id}/messages`,
    config
  );

export const postNewMessage = (data: CreateMessageParams) =>
  axios.post(
    `${API_URL}/conversations/${data.conversationId}/messages`,
    data,
    config
  );

export const postNewConversation = (data: CreateConversationParams) =>
  axios.post<Conversation>(`${API_URL}/conversations`, data, config);

export const deleteMessage = ({
  conversationId,
  messageId,
}: DeleteMessageParams) =>
  axios.delete<DeleteMessageResponse>(
    `${API_URL}/conversations/${conversationId}/messages/${messageId}`,
    config
  );
