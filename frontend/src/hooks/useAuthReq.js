import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import axiosInstance from "../lib/axios";

// used to attach token to req headers
const useAuthReq = () => {
  const { isSignedIn, getToken, isLoaded } = useAuth();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(async (config) => {
      if (isSignedIn) {
        const token = await getToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    return () => axiosInstance.interceptors.request.eject(interceptor);
  }, [isSignedIn, getToken, isLoaded]);

  return { isSignedIn, isLoaded };
};

export default useAuthReq;
