import React from "react";
import Head from "next/head";
import { Box, Heading, Text } from "@chakra-ui/react";

export function HeaderContent() {
  return (
    <Box>
      <Head>
        <title>Guías - Tutor Virtual</title>
      </Head>
      <Heading fontSize="5xl">Guías</Heading>
      <Text fontSize="lg" mt={3}>
        Aquí podrás encontrar las diferentes guías que existen para las personas
        relacionadas con el Centro Virtual de Aprendizaje.
      </Text>
    </Box>
  );
}
