export type createUserParams = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type loginUserParams = {
  email: string;
  password: string;
};

export type DeleteMessageParams = {
  conversationId: number;
  messageId: number;
};

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};

export type CreateConversationParams = {
  email: string;
  message: string;
};

export type Conversation = {
  id: number;
  creator: User;
  recipient: User;
  createdAt: string;
  lastMessageSent: MessageType;
};

export type MessageType = {
  id: number;
  content: string;
  createdAt: string;
  author: User;
  conversation: Conversation;
};

export type FetchMessagePayload = {
  id: number;
  messages: MessageType[];
};

export type MessageEventPayload = {
  message: MessageType;
  conversation: Conversation;
};

export type CreateMessageParams = {
  content: string;
  conversationId: number;
};

export type ConversationMessage = {
  id: number;
  messages: MessageType[];
};
