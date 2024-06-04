import { ScrollArea } from "@/components/ui/scroll-area";
import FriendCard from "./FriendCard";

const Friends = () => {
  return (
    <ScrollArea className="flex flex-col gap-2 min-w-md h-[250px]">
      <FriendCard />
      <FriendCard />
      <FriendCard />
    </ScrollArea>
  );
};

export default Friends;
