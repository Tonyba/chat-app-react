export type ConversationType = {
  id: number;
  name: string;
  lastMessage: string;
};

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
