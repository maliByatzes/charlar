import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useCallback } from "react";
import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('chat-user')) || null);
  const [accessToken, setAccessToken] = useState(Cookies.get('access_token'));

  const refreshAccessToken = useCallback(async () => {
    try {
      const res = await fetch('/api/v1/auth/refresh-token', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setAccessToken(Cookies.get('access_token'));
    } catch (error) {
      console.log(error.message);
    }
  }, [setAccessToken]);

  useEffect(() => {
    refreshAccessToken();
  }, [refreshAccessToken]);

  useEffect(() => {
    let refreshInterval;

    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      const expiresAt = decodedToken.exp * 1000;

      refreshInterval = setTimeout(() => {
        refreshAccessToken();
      }, new Date(expiresAt).getTime() - Date.now() - 10 * 1000);
    }

    return () => {
      if (refreshInterval) {
        clearTimeout(refreshInterval);
      }
    };
  }, [accessToken, refreshAccessToken]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>
  );
};
