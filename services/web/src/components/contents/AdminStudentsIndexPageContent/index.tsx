import React, { useMemo, useState } from "react";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Student } from "lib/types/student";
import { fetcherV1 } from "fetchers";
import { LoadingSpinner } from "components/modules/LoadingSpinner";
import { Button } from "components/elements/Button";
import { StudentsTable } from "./StudentsTable";

export function AdminStudentsIndexPageContent() {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useQuery<{ students: Student[] }>(
    ["/students/superadmin", page],
    () =>
      fetcherV1
        .get("/students/superadmin", {
          params: {
            page,
          },
        })
        .then((res) => res.data)
  );
  const tableData = useMemo(() => (data ? data.students : []), [
    data,
    isLoading,
    page,
  ]);
  return (
    <Box>
      <Heading fontSize="5xl">Estudiantes</Heading>
      <Text fontSize="xl" mt={2}>
        Aquí puedes ver todos los estudiantes registrados en el sistema
      </Text>
      {isLoading && (
        <Box mt={20}>
          <LoadingSpinner />
        </Box>
      )}
      {!isLoading && data && <StudentsTable students={tableData} />}
      <Flex my={5} justifyContent="space-evenly" alignItems="center">
        {page > 0 && (
          <Button colorVariant="primary" onClick={() => setPage(page - 1)}>
            Atras
          </Button>
        )}
        {tableData.length > 0 && (
          <Button colorVariant="primary" onClick={() => setPage(page + 1)}>
            Siguiente
          </Button>
        )}
      </Flex>
    </Box>
  );
}
