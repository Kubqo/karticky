"use client";

import React, { useContext } from "react";
import useAuthState from "./useAuthState";
import { User } from "firebase/auth";

const AuthContext = React.createContext<User | null>(null);

export const AuthProvider = ({ children }: any) => {
  const user = useAuthState();

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useUser = () => useContext(AuthContext);
