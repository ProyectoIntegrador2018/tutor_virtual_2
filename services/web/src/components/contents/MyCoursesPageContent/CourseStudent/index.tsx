import { Box, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { Button } from "components/elements/Button";
import { LoadingSpinner } from "components/modules/LoadingSpinner";
import { fetcherV1 } from "fetchers";
import { useAuth } from "lib/hooks/useAuth";
import { UserRoleName } from "lib/types/role";
import React from "react";
import { useQuery } from "react-query";
import { GradeModal } from "../GradeModal";
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
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { role, loading } = useAuth();
  if (isLoading || loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading fontSize="xl">Estudiantes</Heading>
        {role === UserRoleName.TUTOR && (
          <Button colorVariant="primary" onClick={onOpen}>
            Calificar
          </Button>
        )}
      </Flex>
      {data && data.students && data.students.length > 0 ? (
        <StudentsTable data={data.students} course={id} />
      ) : (
        <Heading size="lg">No hay Estudiantes inscritos en este Curso</Heading>
      )}
      <GradeModal isOpen={isOpen} onClose={onClose} course_id={id} />
    </Box>
  );
}
