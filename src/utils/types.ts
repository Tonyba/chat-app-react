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

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};

export type CreateConversationParams = {
  recipient: string;
};

export type Conversation = {
  id: number;
  creator: User;
  recipient: User;
  createdAt: string;
  message: MessageType[];
};

export type MessageType = {
  id: number;
  content: string;
  createdAt: string;
  author: User;
};

export type MessageEventPayload = {
  id: number;
  createdAt: string;
  conversation: Conversation;
  author: User;
  content: string;
};

export type CreateMessageParams = {
  content: string;
  conversationId: number;
};
