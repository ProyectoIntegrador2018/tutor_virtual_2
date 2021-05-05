import React from "react";
import { Flex, Spinner, Text } from "@chakra-ui/react";

interface IProps {
  message?: string;
}

export function LoadingSpinner({ message }: IProps) {
  return (
    <Flex
      w="100%"
      h="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner size="lg" color="primary.400" thickness="3px" />
      {message && <Text>{message}</Text>}
    </Flex>
  );
}
