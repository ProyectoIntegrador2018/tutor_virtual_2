import { Box, Heading, Flex, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { backend } from "lib/constants/api";
import { Course } from "lib/types/course";
import { useMutation } from "react-query";
import { CourseForm } from "./CourseForm";

export function CoursesCreatePageContent() {
  const toast = useToast();
  const { mutate } = useMutation<Course, Error, Course>((newCourse) =>
    axios.post(`${backend}/v1/courses`, newCourse, { withCredentials: true })
  );
  return (
    <Box>
      <Heading textAlign="center" mt={6}>
        Cursos
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
          Crear curso
        </Text>
        <CourseForm
          initialValues={{
            name: "",
            topic: "",
            duration: 0,
            recognitionType: "",
            url: "",
            seasonID: 0,
          }}
          onSubmit={(
            { name, topic, duration, recognitionType, url, seasonID },
            actions
          ) => {
            mutate(
              {
                name,
                topic,
                duration,
                recognitionType,
                url,
                seasonID,
              },
              {
                onSuccess: () => {
                  actions.setSubmitting(false);
                  toast({
                    status: "success",
                    title: "Curso registrado con exito",
                  });
                },
                onError: () => {
                  toast({
                    status: "error",
                    title: "No pudimos registrar el curso",
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
