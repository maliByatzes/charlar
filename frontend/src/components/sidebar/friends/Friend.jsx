import { Separator } from "@/components/ui/separator";
import Friends from "./Friends";
import Requests from "./Requests";
import AddFriend from "../AddFriend";
import useGetRequests from "@/src/hooks/useGetRequests";
import { Loader2 } from "lucide-react";

const Friend = () => {
  const hasFriends = true;

  const { loading, requests } = useGetRequests();
  
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
      {requests.length !== 0 ? (
        <Requests
          requests={requests} 
          class="flex-1" 
        />
      ) : <p className="text-center">No friend requests</p>}

      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
    </div>
  );
};

export default Friend;
