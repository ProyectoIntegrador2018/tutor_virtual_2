import React from "react";
import Link from "next/link";
import { Box, Text, Link as ChakraLink } from "@chakra-ui/react";

export function NoSeasonsText() {
  return (
    <Box>
      <Text mt={4} fontSize="xl">
        Parece que no tienes aperturas todavía...
      </Text>
      <Text fontSize="lg" mt={8}>
        Puedes crear aperturas al subir información de los cursos por medio de
        un excel
      </Text>
      <Box mt={1}>
        <Link href="/seasons/create">
          <ChakraLink fontSize="lg" color="primary.400">
            O manualmente creando una apertura
          </ChakraLink>
        </Link>
      </Box>
    </Box>
  );
}
