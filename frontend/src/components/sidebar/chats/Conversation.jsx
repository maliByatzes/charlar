import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Conversation = () => {
  return (
    <>
      <div className="flex gap-4 px-2 py-4 items-center cursor-pointer hover:bg-gray-950">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>MZ</AvatarFallback>
        </Avatar>

        <div className="flex">
          <p>John Doe</p>
        </div>
      </div>
    </>
  );
};

export default Conversation;
