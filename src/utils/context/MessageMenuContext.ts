import { createContext, Dispatch, SetStateAction } from "react";
import { MessageType } from "../types";

type MessageMenuContextType = {
  message?: MessageType;
  setMessage: Dispatch<SetStateAction<MessageType | undefined>>;
};

export const MessageMenuContext = createContext<MessageMenuContextType>({
  setMessage: () => {},
});
