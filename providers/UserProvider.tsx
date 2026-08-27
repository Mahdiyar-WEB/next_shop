"use client";
import { useCurrentUser } from "hooks/use-auth";
import { ReactNode, useEffect } from "react";
import { useUserStore } from "stores/user-store";

const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useCurrentUser();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (!isLoading) {
      setUser(data?.user ?? null);
    }
  }, [data, isLoading, setUser]);
  return <>{children}</>;
};

export default UserProvider;
