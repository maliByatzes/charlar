import { useState } from "react";
import { useConversationContext } from "../context/ConversationContext";
import { useEffect } from "react";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversationContext();
  
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/v1/messages/${selectedConversation?.participants[0]._id}`);
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (selectedConversation?.participants[0]._id) getMessages();
  }, [selectedConversation?.participants[0]._id, setMessages]);

  return { loading, messages };
};

export default useGetMessages;
