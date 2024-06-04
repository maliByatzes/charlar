import { useState } from 'react';
import toast from "react-hot-toast";

const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const register = async ({ email, username, password, confirmPassword, gender }) => {
    const success = validateInput({ email, username, password, confirmPassword, gender });
    if (!success) return;

    setLoading(true);
    try {

      const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password, confirmPassword, gender }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success("Registration complete, proceed to login");

      // redirect user to "/login" after registration
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(true);
    }
  };

  return { loading, register };
};

function validateInput({ email, username, password, confirmPassword, gender }) {
  if (!email || !username || !password || !confirmPassword || !gender) {
    toast.error("All fields are required");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}

export default useRegister;
