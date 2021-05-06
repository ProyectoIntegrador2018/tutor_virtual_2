import React from "react";
import { Box, Text } from "@chakra-ui/react";

export function NoCoursesText() {
  return (
    <Box>
      <Text mt={4} fontSize="xl">
        Parece que no tienes cursos todavía...
      </Text>
      <Text fontSize="lg" mt={8}>
        Puedes crear cursos al subir información de los cursos manualmente o por medio de
        un excel
      </Text>
    </Box>
  );
}
