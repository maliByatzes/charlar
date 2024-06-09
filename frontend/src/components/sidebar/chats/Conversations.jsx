import useGetConversations from "@/src/hooks/useGetConversations";
import Conversation from "./Conversation";
import { Loader2 } from "lucide-react";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className="flex flex-col min-w-md gap-2">
      {conversations.map((conversation) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
        />
      ))}

      {loading ? <Loader2 className="animate-spin" /> : null}
    </div>
  );
};

export default Conversations;
