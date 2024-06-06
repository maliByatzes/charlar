import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Message = () => {
  const isSent = false;
  
  return (
    <div className={`flex items-center mb-4 gap-3 ${isSent ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
      <Avatar className="">
        <AvatarImage src="" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div className={`relative p-3 rounded-lg max-w-xs break-words ${isSent ? 'bg-[#27272a]' : 'bg-[#27272a]'}`}>
        Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!
        <span className="absolute text-xs text-gray-500 bottom-0 right-2">12:56</span>
      </div>
    </div>
  );
}

export default Message;
