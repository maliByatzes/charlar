import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useSendRequest from "@/src/hooks/useSendRequest";
import { Loader } from "lucide-react";
import { PlusCircle } from "lucide-react";

const AddFriendCard = ({ user }) => {
  const { loading, sendRequest } = useSendRequest();

  const handleClick = async (userId) => {
    await sendRequest(userId);
  };

  return (
    <div className="flex rounded-lg gap-4 px-2 py-4 items-center cursor-pointer hover:bg-[#27272a]">
      <Avatar>
        <AvatarImage src="" />
        <AvatarFallback>{user.username[0]}</AvatarFallback>
      </Avatar>

      <div className="flex gap-3 justify-between flex-1">
        <p>{user.username}</p>
        {loading ? <Loader className="h-4 animate-spin" /> : (
          <PlusCircle
            className="cursor-pointer"
            onClick={() => handleClick(user._id)}
          />
        )}
      </div>
    </div>
  );
}

export default AddFriendCard;
