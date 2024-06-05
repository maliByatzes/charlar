import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddFriendCard from "./AddFriendCard";

const AddFriend = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <PlusCircle />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add friends</DialogTitle>
          <DialogDescription>
            Search users with their username.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 justify-center">
          <Input type="text" placeholder="johndoe" />
          <ScrollArea className="h-[200px] w-full rounded-md p-4">
            <AddFriendCard />
            <AddFriendCard />
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriend;
