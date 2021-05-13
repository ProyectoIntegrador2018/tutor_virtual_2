import React from "react";
import { Box, Link, Heading, Flex, Text, useToast } from "@chakra-ui/react";
import { useAuth } from "lib/hooks/useAuth";
import NextLink from "next/link";
import { LoginForm } from "./LoginForm";

export function LoginPageContent() {
  const toast = useToast();
  const { login } = useAuth();
  return (
    <Box>
      <Heading fontSize="5xl" textAlign="center" mt={6}>
        Tutor Virtual
      </Heading>
      <Flex
        mt={5}
        boxShadow="lg"
        px={4}
        py={8}
        borderRadius="lg"
        flexDir="column"
        w={["95%", null, "90%", "550px"]}
        mx="auto"
      >
        <Text mb={3} fontSize="2xl" fontWeight={800}>
          Iniciar sesión
        </Text>
        <LoginForm
          initialValues={{ email: "", password: "" }}
          onSubmit={(vals, actions) => {
            login({
              data: {
                email: vals.email,
                password: vals.password,
              },
              url: "/dashboard",
              onSuccess: () => {
                actions.setSubmitting(false);
              },
              onError: (err) => {
                const errMessage = err.message as string;
                if (errMessage.indexOf("403") !== -1) {
                  toast({
                    status: "info",
                    title: "Tu cuenta no ha sido aprobada",
                    description:
                      "Contacta a la administradora para que aprueben tu cuenta.",
                  });
                } else {
                  toast({
                    status: "error",
                    title: "No pudimos iniciar sesión",
                    description: "Revisa tu correo o contraseña",
                  });
                }
                actions.setSubmitting(false);
              },
            });
          }}
        />
        <Text mt={4} textAlign="center" color="blackAlpha.700">
          Aliado?{" "}
          <NextLink href="/aliados" passHref>
            <Link href="/aliados" fontWeight="600">
              Ingresa para ver tus estudiantes aqui.
            </Link>
          </NextLink>
        </Text>
      </Flex>
    </Box>
  );
}
