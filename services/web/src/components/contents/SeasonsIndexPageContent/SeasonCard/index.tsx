import React from "react";
import { Box, Text, Button, Flex } from "@chakra-ui/react";

interface IProps {
  season: any;
}

export function SeasonCard({ season }: IProps) {
  return (
    <Box boxShadow="lg" p={4} borderRadius="md">
      <Text fontSize="lg">Iniciando en</Text>
      <Text fontSize="2xl" fontWeight={700} pl={4}>
        {season.starting}
      </Text>
      <Text fontSize="lg" mt={3}>
        Terminando en
      </Text>
      <Text fontSize="2xl" fontWeight={700} pl={4}>
        {season.ending}
      </Text>
      <Flex justifyContent="flex-end">
        <Button colorScheme="primary">Ver detalle</Button>
      </Flex>
    </Box>
  );
}
