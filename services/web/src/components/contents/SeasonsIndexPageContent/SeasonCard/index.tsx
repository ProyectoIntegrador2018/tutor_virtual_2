import React from "react";
import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { parseISO, format } from "date-fns";

interface IProps {
  season: any;
}

export function SeasonCard({ season }: IProps) {
  const router = useRouter();
  return (
    <Box boxShadow="lg" p={4} borderRadius="md">
      <Text fontSize="lg">Iniciando en</Text>
      <Text fontSize="2xl" fontWeight={700} pl={4}>
        {format(parseISO(season.starting), 'dd/MM/yyyy')}
      </Text>
      <Text fontSize="lg" mt={3}>
        Terminando en
      </Text>
      <Text fontSize="2xl" fontWeight={700} pl={4}>
        {format(parseISO(season.ending), 'dd/MM/yyyy')}
      </Text>
      <Flex justifyContent="flex-end">
        <Button colorScheme="primary" onClick={ ()=> router.push(`/seasons/${season.id}`) } >Ver cursos</Button>
      </Flex>
    </Box>
  );
}
