import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { ExcelUploaderSection } from "components/modules/ExcelUploaderSection";

export function ExampleTestExcelContent() {
  return (
    <Box>
      <Heading>Prueba para subir excel.</Heading>
      <Box w="400px">
        <ExcelUploaderSection
          urlPath="/example/upload-excel"
          httpMethod="POST"
        />
      </Box>
    </Box>
  );
}
