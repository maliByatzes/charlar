import { useConversationContext } from "../context/ConversationContext";
import { useSocketContext } from "../context/SocketContext";
import { useEffect } from "react";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversationContext();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
