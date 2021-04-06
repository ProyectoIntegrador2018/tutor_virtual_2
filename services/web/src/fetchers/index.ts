import axios from "axios";
import { backend } from "lib/constants/api";

export const fetcherV1 = axios.create({
  withCredentials: true,
  baseURL: `${backend}/v1`,
});
