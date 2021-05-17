import React from "react";
import NextLink from "next/link";
import { Box, Text, Link, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface IProps {
  course: any;
  roleName: string;
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
      <Box mt={4}>
        <NextLink href={course.url} prefetch={false}>
          <Link target="_blank" color="primary.200" href={course.url}>
            {course.url}
          </Link>
        </NextLink>
        <Button
          colorScheme="primary"
          mt="5"
          onClick={() => router.push(`/${roleName}/courses/${course.id}`)}
        >
          Ver curso
        </Button>
      </Box>
    </Box>
  );
}
