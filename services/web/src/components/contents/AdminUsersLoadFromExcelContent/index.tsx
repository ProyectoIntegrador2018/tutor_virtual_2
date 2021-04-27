import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { ExcelUploaderSection } from "components/modules/ExcelUploaderSection";

export function AdminUsersLoadFromExcelContent() {
  return (
    <Box>
      <Heading fontSize="5xl">Cargar usuarios</Heading>
      <Text mt={4}>
        Busca el archivo excel que contenga a los usuarios y sube el archivo en
        el botón de abajo.
      </Text>
      <Box w={["100%", null, null, "600px"]} mx="auto" mt={10}>
        <ExcelUploaderSection
          urlPath="/users/load-from-excel"
          httpMethod="POST"
        />
      </Box>
    </Box>
  );
}
