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
    const handleCookieChange = () => {
      // send a server request to access token
    };

    window.addEventListener('storage', handleCookieChange);

    return () => window.removeEventListener('storage', handleCookieChange);
  }, []);
  
  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, authUser, setAuthUser }}>{children}</AuthContext.Provider>
  );
};
