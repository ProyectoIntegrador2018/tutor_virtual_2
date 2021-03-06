import axios from "axios";
import { backend } from "lib/constants/api";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  LoginArgs,
  SignUpArgs,
  SignOutArgs,
  ProvideProps,
  AuthContext,
} from "./useAuth.interface";

const authContext = createContext<AuthContext>(null);

const axiosOptions = {
  withCredentials: true,
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const login = async ({ data, url, onSuccess, onError }: LoginArgs) => {
    setLoading(true);
    const loginUrl = `${backend}/v1/login`;
    axios
      .post(loginUrl, data, axiosOptions)
      .then((res) => {
        onSuccess(res.data);
        setUser(res.data.user);
        setRole(res.data.user.role.name);
        setLoading(false);
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

  const signout = async ({ url, onSuccess, onError }: SignOutArgs) => {
    const signoutUrl = `${backend}/v1/signout`;
    axios
      .get(signoutUrl, axiosOptions)
      .then((res) => {
        onSuccess(res.data);
        router.push(url);
        setUser(null);
        setRole(null);
        setLoading(false);
      })
      .catch((err) => {
        onError(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get(`${backend}/v1/me`, axiosOptions),
      axios.get(`${backend}/v1/me/role`, axiosOptions),
    ])
      .then((result) => {
        setUser(result[0].data.user);
        setRole(result[1].data.role.name);
        setLoading(false);
      })
      .catch(() => {
        /*
          No Auth, no hacer nada
        */
      });
  }, []);

  return {
    user,
    role,
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
