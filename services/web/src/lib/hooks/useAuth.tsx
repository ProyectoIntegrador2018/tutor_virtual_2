import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  LoginArgs,
  SignUpArgs,
  ProvideProps,
  AuthContext,
} from "./useAuth.interface";

const authContext = createContext<AuthContext>(null);

const backend = process.env.NEXT_PUBLIC_BACKEND_ORIGIN;
const axiosOptions = {
  withCredentials: true,
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const login = async ({ data, url }: LoginArgs) => {
    const response = await axios.post(
      `${backend}/v1/login`,
      data,
      axiosOptions
    );
    setUser(response.data.user);
    router.push(url);
  };

  const signup = async ({ data, url }: SignUpArgs) => {
    const response = await axios.post(
      `${backend}/v1/users`,
      data,
      axiosOptions
    );
    setUser(response.data.user);
    router.push(url);
  };

  const signout = () => {
    /* Implement signout in backend */
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`${backend}/v1/me`, axiosOptions).then((result) => {
      setUser(result.data.user);
      setLoading(false);
    });
  }, []);

  return {
    user,
    signup,
    signout,
    loading,
    login,
  };
}

export function ProvideAuth({ children }: ProvideProps) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);
