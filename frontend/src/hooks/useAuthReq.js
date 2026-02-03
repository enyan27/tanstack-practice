import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import axiosInstance from "../lib/axios";

// attach auth token to request if signed in
const useAuthReq = () => {
  const { isSignedIn, isLoaded, getToken } = useAuth();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(async (config) => {
      if (isSignedIn) {
        const token = await getToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    return () => axiosInstance.interceptors.request.eject(interceptor);
  }, [isSignedIn, isLoaded, getToken]);

  return { isSignedIn, isLoaded };
};

export default useAuthReq;
