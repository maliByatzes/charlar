import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useConversationContext } from "@/src/context/ConversationContext";

const Conversation = ({ conversation }) => {
  const { selectedConversation, setSelectedConversation } = useConversationContext();

  const isSelected = selectedConversation?._id === conversation._id;

  return (
    <div
      className={`flex rounded-lg gap-4 px-2 py-4 items-center cursor-pointer hover:bg-[#27272a] ${isSelected ? 'bg-[#27272a]' : ''}`}
      onClick={() => setSelectedConversation(conversation.participants[0])}
    >
      <Avatar>
        <AvatarImage src={conversation.participants[0].profilePic} />
        <AvatarFallback>{conversation.participants[0].username[0]}</AvatarFallback>
      </Avatar>

      <div className="flex">
        <p>{conversation.participants[0].username}</p>
      </div>
    </div>
  );
};

export default Conversation;
