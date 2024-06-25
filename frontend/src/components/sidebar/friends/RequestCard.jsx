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
import useUpdateRequest from "@/src/hooks/useUpdateRequest";
import { CircleCheck } from "lucide-react";
import { CircleX } from "lucide-react";

const RequestCard = ({ request }) => {
  const { loading, updateRequest } = useUpdateRequest();
  const { theme } = useTheme();

  const selectedHoverClass = theme === 'dark' ? 'hover:bg-[#27272a]' : 'hover:bg-[#f9fafb]';

  const handleAddClick = async () => {
    await updateRequest(request._id, "accept");
  };

  const handleRejectClick = async () => {
    await updateRequest(request._id, "decline");
  };

  return (
    <div className={`flex rounded-lg gap-4 px-2 py-4 items-center cursor-pointer ${selectedHoverClass}`}>
      <Avatar>
        <AvatarImage src={request.senderId.profilePic} />
        <AvatarFallback>{request.senderId.username[0].toUpperCase()}</AvatarFallback>
      </Avatar>

      <div className="flex gap-3 justify-between flex-1">
        <p>{request.senderId.username}</p>
        <div className="flex gap-2 justify-between pr-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <CircleCheck />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will add this user as your friend.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleAddClick}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <CircleX />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will reject this friend request.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleRejectClick}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
