import { Course } from "./course";
import { Student } from "./student";

export type Grade = {
  id: string;
  student?: Student;
  course?: Course;
  grade: number;
  activity: number;
};
