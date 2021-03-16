import { User } from "@types/user";
import { ReactNode } from "react";
import { UserRoleName } from "@types/user";

export type ProvideProps = {
  children: ReactNode;
};

export type LoginArgs = {
  data: { email: string; password: string };
  url: string;
};

export type SignUpArgs = {
  data: {
    email: string;
    password: string;
    firstName: string;
    maternalName: string;
    confirmPassword: string;
    // cambiar a un enum
    roleName: UserRoleName;
  };
  url: string;
};

export type AuthContext = {
  user: User | null;
  login: (args: LoginArgs) => void;
  signup: (args: SignUpArgs) => void;
  signout: () => void;
  loading: boolean;
};
