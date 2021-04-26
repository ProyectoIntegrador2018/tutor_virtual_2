import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface IProps {
  file: File;
}

export function FileInfo({ file }: IProps) {
  return (
    <Box>
      <Text fontSize="lg" fontWeight={700}>
        {file.name}
      </Text>
    </Box>
  );
}
