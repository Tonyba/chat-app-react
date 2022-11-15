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

export type Conversation = {
  id: number;
  creator: User;
  recipient: User;
  // lastMessage: Message,
};

export type MessageType = {
  id: number;
  content: string;
  createdAt: string;
  author: User;
};
