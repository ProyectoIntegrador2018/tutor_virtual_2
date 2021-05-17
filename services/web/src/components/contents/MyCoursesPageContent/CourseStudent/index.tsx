import { Box, Heading } from "@chakra-ui/react";
import { LoadingSpinner } from "components/modules/LoadingSpinner";
import { fetcherV1 } from "fetchers";
import React from "react";
import { useQuery } from "react-query";
import { StudentsTable } from "../StudentsTable";

interface IProps {
  id: string;
}

export function CourseStudent({ id }: IProps) {
  const { data, isLoading } = useQuery(["/courses/students", id], () =>
    fetcherV1
      .get("/courses/students", { params: { id } })
      .then((res) => res.data)
  );
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      <Heading mb={4} fontSize="xl">
        Estudiantes
      </Heading>
      {data && data.students && data.students.length > 0 ? (
        <StudentsTable data={data.students} />
      ) : (
        <Heading size="lg">No hay Estudiantes inscritos en este Curso</Heading>
      )}
    </Box>
  );
}
