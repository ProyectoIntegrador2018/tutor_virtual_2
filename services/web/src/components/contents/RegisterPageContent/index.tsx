import React from "react";
import { Box, Heading, Flex, Text, useToast, propNames } from "@chakra-ui/react";
import { useAuth } from "lib/hooks/useAuth";
import { RegisterForm } from "./RegisterForm/RegisterForm";
import { UserRoleName } from "lib/types/role";

interface IProps {
  roleName: UserRoleName;
 }

export function RegisterPageContent(props: IProps) {
  const toast = useToast();
  const { signup } = useAuth();

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
          Registro
        </Text>
        <RegisterForm
          initialValues={{  firstName: "", paternalName: "", maternalName: "", email: "", password: "", confirmPassword: ""}}
          onSubmit={(vals, actions) => {
            signup({
              data: {
                firstName: vals.firstName,
                paternalName: vals.paternalName,
                maternalName: vals.maternalName,
                email: vals.email,
                password: vals.password,
                confirmPassword: vals.confirmPassword,
                roleName: props.roleName
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
                    title: "No pudimos registrarte",
                    description: "Vuelve a intentar",
                  });
                }
                actions.setSubmitting(false);
              },
            });
          }}
        />
      </Flex>
    </Box>
  );
}
