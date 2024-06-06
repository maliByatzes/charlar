import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
  const isChatSelected = false; //temporary condition

  return (
    <div className="flex flex-col w-full">
      {isChatSelected ? <NoChatSelected /> : (
        <>
          <div className="flex items-center gap-3 px-4 py-2 mb-2">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <p className="font-bold">John Doe</p>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center font-semibold flex flex-col items-center gap-2">
        <p>Welcome John Doe</p>
        <p>Select a friend to start messaging</p>
      </div>
    </div>
  );
};

export default MessageContainer;
