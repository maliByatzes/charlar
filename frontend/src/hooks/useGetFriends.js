import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

const useGetFriends = () => {
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/v1/friends/');
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setFriends(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    getFriends();
  }, [friends]);

  return { loading, friends };
};

export default useGetFriends;
