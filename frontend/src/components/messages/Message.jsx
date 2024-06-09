import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/src/context/AuthContext";
import { useConversationContext } from "@/src/context/ConversationContext";
import { formatTime } from "@/src/utils/formatTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversationContext();
  const fromMe = message.senderId === authUser._id;
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;

  return (
    <div className={`flex items-end mb-4 gap-3 justify-start ${fromMe ? 'flex-row-reverse' : ''}`}>
      <Avatar className="">
        <AvatarImage src={profilePic} />
        <AvatarFallback>u</AvatarFallback>
      </Avatar>
      <div className={`relative p-3 rounded-lg max-w-xs break-words bg-[#27272a]`}>
        {message.message}
        <span className="absolute text-xs text-gray-500 bottom-0 right-2">{formatTime(message.createdAt)}</span>
      </div>
    </div>
  );
}

export default Message;
