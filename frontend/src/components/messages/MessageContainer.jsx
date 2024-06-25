import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useConversationContext } from "@/src/context/ConversationContext";
import { useAuthContext } from "@/src/context/AuthContext";
import { useEffect } from "react";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversationContext();
  const { authUser } = useAuthContext();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="flex flex-col w-full">
      {!selectedConversation ? <NoChatSelected user={authUser} /> : (
        <>
          <div className="flex items-center gap-3 px-4 py-2 mb-2">
            <Avatar>
              <AvatarImage src={selectedConversation?.profilePic} />
              <AvatarFallback>{selectedConversation?.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <p className="font-bold">{selectedConversation?.username}</p>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

const NoChatSelected = ({ user }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center font-semibold flex flex-col items-center gap-2">
        <p>{`Welcome ${user.username}`}</p>
        <p>Select a friend to start messaging</p>
      </div>
    </div>
  );
};

export default MessageContainer;
