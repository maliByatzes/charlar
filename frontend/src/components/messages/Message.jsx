import { useTheme } from "@/components/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/src/context/AuthContext";
import { useConversationContext } from "@/src/context/ConversationContext";
import { formatTime } from "@/src/utils/formatTime";

const Message = ({ message }) => {
  const { theme } = useTheme();
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversationContext();
  const fromMe = message.senderId === authUser._id;
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;

  const messageBgClass = theme === 'dark' ? 'bg-[#27272a]' : 'bg-[#f9fafb]';

  return (
    <div className={`flex items-end mb-4 gap-3 justify-start ${fromMe ? 'flex-row-reverse' : ''}`}>
      <Avatar className="">
        <AvatarImage src={profilePic} />
        <AvatarFallback>{authUser.username[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className={`relative p-3 rounded-lg max-w-xs break-words ${messageBgClass}`}>
        {message.message}
        <span className="absolute text-xs text-gray-500 bottom-0 right-2">{formatTime(message.createdAt)}</span>
      </div>
    </div>
  );
}

export default Message;
