import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useConversationContext } from "@/src/context/ConversationContext";
import { useSocketContext } from "@/src/context/SocketContext";

const Conversation = ({ conversation }) => {
  const { selectedConversation, setSelectedConversation } = useConversationContext();

  const isSelected = selectedConversation?._id === conversation.participants[0]._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation.participants[0]._id);

  return (
    <div
      className={`flex rounded-lg gap-4 px-2 py-4 items-center cursor-pointer hover:bg-[#27272a] ${isSelected ? 'bg-[#27272a]' : ''}`}
      onClick={() => setSelectedConversation(conversation.participants[0])}
    >
      <Avatar>
        <AvatarImage src={conversation.participants[0].profilePic} />
        <AvatarFallback>{conversation.participants[0].username[0]}</AvatarFallback>
      </Avatar>

      <div className="flex flex-1">
        <p>{conversation.participants[0].username}</p>
      </div>

      <div className={`h-2 w-2 rounded-full ${isOnline ? 'bg-green-500': 'bg-transparent'}`}></div>
    </div>
  );
};

export default Conversation;
