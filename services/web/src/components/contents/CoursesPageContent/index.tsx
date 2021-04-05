import { Box, Heading, Flex, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "lib/hooks/useAuth";
import { CourseForm } from "./CourseForm"

export function CoursesPageContent() {
  const toast = useToast();
  const { createCourse } = useAuth();
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
          initialValues={{ name: "", topic: "", duration: "", recognitionType: "", url: "", seasonID: "" }}
          onSubmit={(vals, actions) => {
            createCourse({
              data: {
                name: vals.name,
                topic: vals.topic,
                duration: vals.duration,
                recognitionType: vals.recognitionType,
                url: vals.url,
                seasonID: vals.seasonID
              },
              url: "/courses",
              onSuccess: () => {
                actions.setSubmitting(false);
              },
              onError: () => {
                toast({
                  status: "error",
                  title: "No pudimos registrar el curso",
                  description: "Vuelva a intentar más tarde",
                });
                actions.setSubmitting(false);
              },
            });
          }}
        />
      </Flex>
    </Box>
	);
}
