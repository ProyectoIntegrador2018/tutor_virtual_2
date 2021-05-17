import { Box, Heading } from "@chakra-ui/react";
import { LoadingSpinner } from "components/modules/LoadingSpinner";
import { fetcherV1 } from "fetchers";
import React from "react";
import { useQuery } from "react-query";
import { StudentsTable } from "./StudentsTable";

interface IProps {
  courseKey: string;
}

export function TutorCoursesStudentsPageContent({ courseKey }: IProps) {
  const { data, isLoading } = useQuery(["/courses/students", courseKey], () =>
    fetcherV1
      .get("/courses/students", { params: { courseKey } })
      .then((res) => res.data)
  );
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      <Heading mb={4}>Mis Estudiantes</Heading>
      <StudentsTable data={data.students} />
    </Box>
  );
}
