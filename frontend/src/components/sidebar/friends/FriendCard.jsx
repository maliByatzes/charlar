import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useConversationContext } from "@/src/context/ConversationContext";
import useRemoveFriend from "@/src/hooks/useRemoveFriend";
import { Trash2 } from "lucide-react";

const FriendCard = ({ friend, friendId }) => {
  const { removeFriend } = useRemoveFriend();
  const { selectedConversation, setSelectedConversation } = useConversationContext();

  const isSelected = selectedConversation?._id === friend._id;

  const handleRemoveAction = async () => {
    await removeFriend(friendId);
  };

  return (
    <div
      className={`flex rounded-lg gap-4 px-2 py-4 items-center cursor-pointer hover:bg-[#27272a] ${isSelected ? 'bg-[#27272a]' : ''}`}
      onClick={() => setSelectedConversation(friend)}
    >
      <Avatar>
        <AvatarImage src={friend.profilePic} />
        <AvatarFallback>{friend.username[0]}</AvatarFallback>
      </Avatar>

      <div className="flex gap-3 justify-between flex-1">
        <p>{friend.username}</p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Trash2 />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will remove this user as your friend.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleRemoveAction}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default FriendCard;
