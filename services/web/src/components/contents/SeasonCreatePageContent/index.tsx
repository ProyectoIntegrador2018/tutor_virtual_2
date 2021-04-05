import { useToast, Box, Heading, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { backend } from "lib/constants/api";
import { Season } from "lib/types/season";
import { useMutation } from "react-query";
import { SeasonForm } from "./SeasonForm";

export function SeasonCreatePageContent() {
  const toast = useToast();
  const { mutate } = useMutation<Season, Error, Season>((newSeason) =>
    axios.post(`${backend}/v1/seasons`, newSeason, { withCredentials: true })
  );

  return (
    <Box>
      <Heading textAlign="center" mt={6}>
        Aperturas
      </Heading>
      <Flex
        mt={5}
        px={4}
        py={8}
        borderRadius="lg"
        flexDir="column"
        w={["95%", null, "90%", "550px"]}
        mx="auto"
      >
        <Text mb={3} fontSize="2xl" fontWeight={800}>
          Crear Apertura
        </Text>
        <SeasonForm
          initialValues={{
            starting: "",
            ending: "",
          }}
          onSubmit={({ starting, ending }, actions) => {
            mutate(
              {
                starting,
                ending,
              },
              {
                onSuccess: () => {
                  actions.setSubmitting(false);
                  toast({
                    status: "success",
                    title: "Apertura registrada con exito",
                  });
                },
                onError: () => {
                  toast({
                    status: "error",
                    title: "No pudimos registrar la apertura ",
                    description: "Vuelva a intentar más tarde",
                  });
                  actions.setSubmitting(false);
                },
              }
            );
          }}
        />
      </Flex>
    </Box>
  );
}
