import { useState } from "react";
import toast from "react-hot-toast";

const useSendRequest = () => {
  const [loading, setLoading] = useState(false);

  const sendRequest = async (userId) => {
    if (!userId) {
      toast.error('No user id provided');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/v1/requests/send/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success('Request sent successfully');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendRequest };
};

export default useSendRequest;
