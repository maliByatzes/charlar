import { useTheme } from "@/components/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useConversationContext } from "@/src/context/ConversationContext";
import { useSocketContext } from "@/src/context/SocketContext";

const Conversation = ({ conversation }) => {
  const { theme } = useTheme();
  const { selectedConversation, setSelectedConversation } = useConversationContext();

  const isSelected = selectedConversation?._id === conversation.participants[0]._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation.participants[0]._id);

  const selectedHoverClass = theme === 'dark' ? 'hover:bg-[#27272a]' : 'hover:bg-[#f9fafb]';
  const selectedClass = theme === 'dark' ? 'bg-[#27272a]' : 'bg-[#f9fafb]';

  return (
    <div
      className={`flex rounded-lg gap-4 px-2 py-4 items-center cursor-pointer ${selectedHoverClass} ${isSelected ? selectedClass : ''}`}
      onClick={() => setSelectedConversation(conversation.participants[0])}
    >
      <Avatar>
        <AvatarImage src={conversation.participants[0].profilePic} />
        <AvatarFallback>{conversation.participants[0].username[0].toUpperCase()}</AvatarFallback>
      </Avatar>

      <div className="flex flex-1">
        <p>{conversation.participants[0].username}</p>
      </div>

      <div className={`h-2 w-2 rounded-full ${isOnline ? 'bg-green-500': 'bg-transparent'}`}></div>
    </div>
  );
};

export default Conversation;
