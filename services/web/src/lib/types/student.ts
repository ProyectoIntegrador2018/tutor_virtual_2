import { Ally } from "./ally";

export type Student = {
  id: string;
  username: string;
  password: string;
  name: string;
  paternal_name: string;
  maternal_name: string;
  country: string;
  state: string;
  city: string;
  email: string;
  ally?: Ally;
};
