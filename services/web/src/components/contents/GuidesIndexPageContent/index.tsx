import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { HeaderContent } from "./HeaderContent";
import { DownloadCard } from "./DownloadCard";

export function GuidesIndexPageContent() {
  return (
    <Box>
      <HeaderContent />
      <Box mt={10}>
        <SimpleGrid spacing={6} columns={[1, null, null, 2]}>
          <DownloadCard
            title="Políticas de evaluación"
            description="Las políticas de evaluación sirven para orientar a los tutores a que..."
            filename="myfile.pdf"
          />
          <DownloadCard
            title="Manual de como calificar"
            description="Aquí mostraremos como calificar a un estudiante"
            filename="grading.pdf"
          />
          <DownloadCard
            title="Horarios de atención"
            description="Aquí mostramos todos los horarios de atención"
            filename="hours.pdf"
          />
        </SimpleGrid>
      </Box>
    </Box>
  );
}
