import { User } from "lib/types/user";
import { UserRoleName } from "lib/types/role";
import { ReactNode } from "react";

export type ProvideProps = {
  children: ReactNode;
};

export type LoginArgs = {
  data: { email: string; password: string };
  url: string;
  onSuccess: (data: any) => void;
  onError: (err: any) => void;
};

export type SignUpArgs = {
  data: {
    email: string;
    password: string;
    firstName: string;
    paternalName: string;
    maternalName: string;
    confirmPassword: string;
    roleName: UserRoleName;
  };
  url: string;
  onSuccess: (data: any) => void;
  onError: (err: any) => void;
};

export type CreateCourseArgs = {
  data: {
    name: string;
    topic: string;
    duration: number;
    recognitionType: string;
    url: string;
    seasonID: number;
  };
  url: string;
  onSuccess: (data: any) => void;
  onError: (err: any) => void;
}

export type AuthContext = {
  user: User | null;
  role: UserRoleName | null;
  login: (args: LoginArgs) => void;
  signup: (args: SignUpArgs) => void;
  signout: () => void;
  loading: boolean;
};
