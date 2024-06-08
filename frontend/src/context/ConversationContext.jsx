import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

export const ConversationContext = createContext();

export const useConversationContext = () => {
  return useContext(ConversationContext);
};

export const ConversationContextProvider = ({ children }) => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  return (
    <ConversationContext.Provider value={{ selectedConversation, setSelectedConversation, messages, setMessages }}>
      {children}
    </ConversationContext.Provider>
  );
};
