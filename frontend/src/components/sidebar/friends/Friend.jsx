import { Separator } from "@/components/ui/separator";
import Friends from "./Friends";
import Requests from "./Requests";
import AddFriend from "../AddFriend";
import useGetRequests from "@/src/hooks/useGetRequests";
import { Loader2 } from "lucide-react";
import useGetFriends from "@/src/hooks/useGetFriends";

const Friend = () => {
  const { loading: loading1, requests } = useGetRequests();
  const { loading: loading2, friends } = useGetFriends();

  return (
    <div className="flex flex-col">
      {friends.length !== 0 ? (
        <Friends
          friends={friends}
          className="flex-1"
        />
      ) : <p className="text-center">No friends</p>}

      {loading2 ? <Loader2 className="w-8 h-8 animate-spin" /> : null}
      <Separator className="my-6" />
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-center text-lg underline mb-3">Friend requests</h1>
        <AddFriend />
      </div>
      {requests.length !== 0 ? (
        <Requests
          requests={requests}
          class="flex-1"
        />
      ) : <p className="text-center">No friend requests</p>}

      {loading1 ? <Loader2 className="w-8 h-8 animate-spin" /> : null}
    </div>
  );
};

export default Friend;
