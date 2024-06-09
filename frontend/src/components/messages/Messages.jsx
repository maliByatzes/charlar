import { ScrollArea } from "@/components/ui/scroll-area";
import Message from "./Message";
import useGetMessages from "@/src/hooks/useGetMessages";
import { useEffect } from "react";
import { useRef } from "react";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
    }, 100);
  }, [messages]);
  
  return (
    <ScrollArea className="px-4 flex-1 overflow-auto flex flex-grow overflow-y-auto flex-col gap-3">
      {!loading && messages.length > 0 && messages.map((message) => (
        <div key={message._id} ref={lastMessageRef}>
          <Message message={message} />
        </div>
      ))}
      
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </ScrollArea>
  );
}

export default Messages;
