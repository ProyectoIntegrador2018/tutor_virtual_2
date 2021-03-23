import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "components/modules/Navbar";

interface IProps {
  children: React.ReactNode;
}

export function TutorLayout({ children }: IProps) {
  return (
    <Flex backgroundColor="blackAlpha.50" h="100vh">
      <Navbar />
      <Box
        backgroundColor="white"
        borderLeftRadius={[0, 0, 44, 44]}
        p={[4, 4, 16, 16]}
        shadow="lg"
        w="100%"
      >
        {children}
      </Box>
    </Flex>
  );
}
