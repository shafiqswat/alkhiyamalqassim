/** @format */
"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  isOwner as isOwnerUtil,
  onAuthStateChangedListener,
  signInOwner,
  signOutUser,
} from "../services/user.service";

const UserContext = createContext({
  user: null,
  isOwner: false,
  loading: true,
  loginOwner: async (_email, _password) => {},
  logout: async () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const loginOwner = async (email, password) => {
    setLoading(true);
    try {
      const loggedIn = await signInOwner(email, password);
      setUser(loggedIn);
      return loggedIn;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOutUser();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      user,
      isOwner: isOwnerUtil(user),
      loading,
      loginOwner,
      logout,
    }),
    [user, loading]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

export default UserContext;
