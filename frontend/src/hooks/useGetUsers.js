import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

const useGetUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

 useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/v1/users/others');
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setUsers(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, [users]);

  return { loading, users };
};

export default useGetUsers;
