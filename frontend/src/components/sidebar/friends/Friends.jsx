import { ScrollArea } from "@/components/ui/scroll-area";
import FriendCard from "./FriendCard";
import { useAuthContext } from "@/src/context/AuthContext";

const Friends = ({ friends }) => {
  const { authUser } = useAuthContext();

  return (
    <ScrollArea className="flex flex-col gap-2 min-w-md h-[250px]">
      {friends.map((f) => (
        <FriendCard
          key={f._id}
          friend={f.user1._id === authUser._id ? f.user2 : f.user1}
          friendId={f._id}
        />
      ))}
    </ScrollArea>
  );
};

export default Friends;
