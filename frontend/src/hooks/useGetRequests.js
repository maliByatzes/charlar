import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

const useGetRequests = () => {
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const getRequests = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/v1/requests/received');
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setRequests(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getRequests();
  }, [requests]);

  return { loading, requests };
};

export default useGetRequests;
