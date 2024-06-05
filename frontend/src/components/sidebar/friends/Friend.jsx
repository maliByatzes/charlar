import { Separator } from "@/components/ui/separator";
import Friends from "./Friends";
import Requests from "./Requests";
import AddFriend from "../AddFriend";

const Friend = () => {
  const hasFriends = true;
  const hasRequests = true;

  return (
    <div className="flex flex-col">
      {hasFriends ? (
        <Friends class="flex-1" />
      ) : <p className="text-center">No friends</p>}
      <Separator className="my-6" />
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-center text-lg underline mb-3">Friend requests</h1>
        <AddFriend />
      </div>
      {hasRequests ? (
        <Requests class="flex-1" />
      ) : <p className="text-center">No friend requests</p>}
    </div>
  );
};

export default Friend;
