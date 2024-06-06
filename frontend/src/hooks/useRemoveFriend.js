import { useState } from "react";
import toast from "react-hot-toast";

const useRemoveFriend = () => {
  const [loading, setLoading] = useState(false);

  const removeFriend = async (friendId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/friends/remove/${friendId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, removeFriend };
}

export default useRemoveFriend;
