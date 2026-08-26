"use client";
import { useCurrentUser } from "hooks/use-auth";
import { ReactNode, useEffect } from "react";
import { useUserStore } from "stores/user-store";

const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useCurrentUser();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    setUser(data?.user ?? null);
  }, [data, setUser]);
  return <>{children}</>;
};

export default UserProvider;
