import { Box } from "@chakra-ui/react";
import { StudentsTable } from "components/contents/TutorCoursesStudentsPageContent/StudentsTable";
import { Student } from "lib/types/student";
import React from "react";

interface IProps {
  data?: Student[];
}

export function StudentTableDisplay({ data }: IProps) {
  if (!data) {
    return <div />;
  }

  if (data.length <= 0) {
    return <>No se encontraron estudiantes con el identificador del aliado.</>;
  }

  return (
    <Box
      w="80%"
      borderWidth="1px"
      shadow="lg"
      borderRadius="lg"
      borderColor="blackAlpha.200"
      p={8}
    >
      <StudentsTable data={data} />
    </Box>
  );
}
