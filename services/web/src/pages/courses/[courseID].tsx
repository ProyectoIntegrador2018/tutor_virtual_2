import { useRouter } from "next/router";

const Course = () => {
  const router = useRouter();
  const { courseID } = router.query;

  return <p>Course: {courseID}</p>;
};

export default Course;
