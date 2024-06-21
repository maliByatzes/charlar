import { useTheme } from "@/components/theme-provider";
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
  const { theme } = useTheme();
  const { removeFriend } = useRemoveFriend();
  const { selectedConversation, setSelectedConversation } = useConversationContext();

  const isSelected = selectedConversation?._id === friend._id;

  const selectedHoverClass = theme === 'dark' ? 'hover:bg-[#27272a]' : 'hover:bg-[#f9fafb]';
  const selectedClass = theme === 'dark' ? 'bg-[#27272a]' : 'bg-[#f9fafb]';

  const handleRemoveAction = async () => {
    await removeFriend(friendId);
  };

  return (
    <div
      className={`flex rounded-lg gap-4 px-2 py-4 items-center cursor-pointer ${selectedHoverClass} ${isSelected ? selectedClass : ''}`}
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
