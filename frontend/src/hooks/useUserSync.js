import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { syncUser } from "../lib/api";

// sync clerk user with user in database
const useUserSync = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { mutate, isPending, isSuccess } = useMutation({ mutationFn: syncUser });

  useEffect(() => {
    if (isSignedIn && user && !isPending && !isSuccess) {
      mutate({
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName || user.firstName,
        imageUrl: user.imageUrl
      });
    }
  }, [isSignedIn, user, mutate, isPending, isSuccess]);

  return { isSuccess };
};

export default useUserSync;
