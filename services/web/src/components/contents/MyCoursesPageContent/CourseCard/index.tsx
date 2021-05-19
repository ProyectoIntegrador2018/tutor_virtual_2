import React from "react";
import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { UserRoleName } from "lib/types/role";

interface IProps {
  course: any;
  roleName: UserRoleName;
}

export function CourseCard({ course, roleName }: IProps) {
  const router = useRouter();
  return (
    <Box p={6} boxShadow="xl" borderRadius="xl">
      <Text fontSize="lg" fontWeight={700}>
        {course.name}
      </Text>
      <Text mb={2} fontSize="sm" fontStyle="italic">
        {course.claveCurso}
      </Text>
      <Text>{course.recognitionType}</Text>
      <Flex
        mt={4}
        justifyContent="space-between"
        flexDir="row-reverse"
        alignItems="center"
      >
        <Button
          colorScheme="primary"
          mt="5"
          onClick={() =>
            router.push(`/${roleName.toLowerCase()}/courses/${course.id}`)
          }
        >
          Ver curso
        </Button>
      </Flex>
    </Box>
  );
}
