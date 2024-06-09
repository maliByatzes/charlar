import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSendMessages from "@/src/hooks/useSendMessages";
import { Loader2 } from "lucide-react";
import { Send } from "lucide-react";
import { useState } from "react";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessages();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage(message);
    setMessage("");
  };
  
  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <Input
          type="text"
          className=""
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button className="absolute inset-y-0 end-0" variant="ghost">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send />}
        </Button>
      </div>
    </form>
  );
};

export default MessageInput;
