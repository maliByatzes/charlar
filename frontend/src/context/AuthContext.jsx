import Cookies from "js-cookie";
import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('chat-user')) || null);
  const [accessToken, setAccessToken] = useState(Cookies.get('access_token'));
  
  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const res = await fetch('/api/v1/auth/refresh-token', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }
      } catch (error) {
        console.log(error.message); 
      }
    };

    refreshAccessToken();
  }, [accessToken]);

  const checkCookie = Cookies.get('access_token');
  if (accessToken !== checkCookie) {
    setAccessToken(checkCookie);
  }
  
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>
  );
};
