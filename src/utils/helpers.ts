import { Conversation, User } from "./types";

export const getOtherUserFromConversation = (
  user?: User,
  conversation?: Conversation
) => {
  return user?.id === conversation?.creator.id
    ? conversation?.recipient
    : conversation?.creator;
};
