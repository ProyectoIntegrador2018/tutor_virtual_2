import { Box, Center, Flex, Stack } from "@chakra-ui/react";
import NavbarItem from "components/elements/NavbarItem";
import NavbarLayout from "components/layouts/NavbarLayout";
import { useAuth } from "lib/hooks/useAuth";
import routes from "lib/routes";
import Image from "next/image";
import React from "react";

export default function Navbar() {
  const { user, loading, role } = useAuth();

  return (
    <NavbarLayout>
      <Flex flexDir="column" h="100%">
        <Flex flexGrow={1} flexDir="column">
          <Center>
            <Box h="75px" my={4} position="relative" w="75%">
              <Image
                src="/cva_sinfondo.png"
                layout="fill"
                objectFit="scale-down"
              />
            </Box>
          </Center>
          {!loading && (
            <Stack spacing={2} px={2}>
              {routes[role].map((route) => (
                <NavbarItem {...route} key={route.route} />
              ))}
            </Stack>
          )}
        </Flex>
        {!loading && (
          <Flex p={5} color="gray.400">
            {user.firstName} {user.paternalName} {user.maternalName}
          </Flex>
        )}
      </Flex>
    </NavbarLayout>
  );
}
