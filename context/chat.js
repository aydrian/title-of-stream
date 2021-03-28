import { createContext, useContext } from "react";

const ChatContext = createContext();

export function ChatProvider({ children, client }) {
  return <ChatContext.Provider value={client}>{children}</ChatContext.Provider>;
}

export function useChatClient() {
  const client = useContext(ChatContext);

  if (client === undefined) {
    throw new Error("useChatClient must be used within ChatProvider");
  }

  return client;
}
