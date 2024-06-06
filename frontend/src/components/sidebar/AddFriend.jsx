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
import useGetUsers from "@/src/hooks/useGetUsers";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const AddFriend = () => {
  // TODO: figure out how to use setFilteredUsers on the useGetUsers hook
  const { loading, users } = useGetUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleInputChange = (e) => {
    const searchItem = e.target.value;
    
    setSearchTerm(searchItem);

    const filteredItems = users.filter((user) => user.username.toLowerCase().includes(searchItem.toLowerCase()));

    setFilteredUsers(filteredItems);
  };
  
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
          <Input 
            type="text" 
            placeholder="johndoe" 
            value={searchTerm}
            onChange={handleInputChange}
          />
          <ScrollArea className="h-[200px] w-full rounded-md p-4">
            {filteredUsers.map((user) => (
              <AddFriendCard 
                key={user._id}
                user={user}  
              />
            ))}

            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriend;
