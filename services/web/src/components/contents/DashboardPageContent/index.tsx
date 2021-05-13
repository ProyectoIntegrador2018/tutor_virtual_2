import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useAuth } from "lib/hooks/useAuth";

export function DashboardPageContent() {
  const { user } = useAuth();

  return (
    <Box>
      {user && (
        <Heading fontSize="5xl">
          Te damos la bienvenida, {user.firstName}!{" "}
        </Heading>
      )}
      <Text fontSize="xl" mt={8}>
        Comienza a explorar el menú para que veas las distintas funcionalidades
        que el sistema tiene para ti!
      </Text>
    </Box>
  );
}
