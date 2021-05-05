import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface IProps {
  title: string;
  description?: string;
}

export function ErrorMessage({ title, description }: IProps) {
  return (
    <Box>
      <Text textAlign="center" color="red.600" fontSize="3xl" fontWeight={800}>
        {title}
      </Text>
      {description && (
        <Text mt={4} textAlign="center" fontSize="xl" fontStyle="italic">
          {description}
        </Text>
      )}
    </Box>
  );
}
