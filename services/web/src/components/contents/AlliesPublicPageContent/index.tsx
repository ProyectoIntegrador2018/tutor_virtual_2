import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { AlliesStudentFormCreate } from "./AlliesStudentFormCreate";
import { StudentTableDisplay } from "./StudentTableDisplay";

export function AlliesPublicPageContent() {
  const [students, setStudents] = useState(null);

  return (
    <Box>
      <Flex
        mt={5}
        boxShadow="lg"
        px={4}
        py={8}
        borderWidth="1px"
        borderColor="blackAlpha.200"
        borderRadius="lg"
        flexDir="column"
        w={["95%", null, "90%", "550px"]}
        mx="auto"
      >
        <Heading>Bienvenido</Heading>
        <Text>Ingrese el identificador que se le proporciono.</Text>
        <AlliesStudentFormCreate onComplete={setStudents} />
      </Flex>
      <Flex w="100%" justifyContent="center" mt={16}>
        <StudentTableDisplay data={students} />
      </Flex>
    </Box>
  );
}
