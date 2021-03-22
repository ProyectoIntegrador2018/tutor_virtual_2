import axios from "axios";
import { useRouter } from "next/router";
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

  const login = async ({ data, url, onSuccess, onError }: LoginArgs) => {
    const loginUrl = `${backend}/v1/login`;
    axios
      .post(loginUrl, data, axiosOptions)
      .then((res) => {
        onSuccess(res.data);
        setUser(res.data.user);
        router.push(url);
      })
      .catch((err) => {
        onError(err);
      });
  };

  const signup = async ({ data, url, onSuccess, onError }: SignUpArgs) => {
    const signupUrl = `${backend}/v1/users`;
    axios
      .post(signupUrl, data, axiosOptions)
      .then((res) => {
        onSuccess(res.data);
        setUser(res.data.user);
        router.push(url);
      })
      .catch((err) => {
        onError(err);
      });
  };
/*
  const signup = async ({ data, url, onSuccess, onError }: SignUpArgs) => {
    const response = await axios.post(
      `${backend}/v1/users`,
      data,
      axiosOptions
    );
    setUser(response.data.user);
    router.push(url);
  };
  */

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
