import React from "react";
import { Box } from "@chakra-ui/react";

interface IProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: IProps) {
  return <Box>{children}</Box>;
}
