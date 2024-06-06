import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateRequest = () => {
  const [loading, setLoading] = useState(false);

  const updateRequest = async (requestId, decision) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/requests/update/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision }),
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

  return { loading, updateRequest };
}

export default useUpdateRequest;
