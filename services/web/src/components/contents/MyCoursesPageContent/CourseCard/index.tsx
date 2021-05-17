import React from "react";
import NextLink from "next/link";
import { Box, Text, Link, Flex } from "@chakra-ui/react";

interface IProps {
  course: any;
}

export function CourseCard({ course }: IProps) {
  return (
    <Box p={6} boxShadow="xl" borderRadius="xl">
      <Text fontSize="lg" fontWeight={700}>
        {course.name}
      </Text>
      <Text mb={2} fontSize="sm" fontStyle="italic">
        {course.claveCurso}
      </Text>
      <Text>{course.recognitionType}</Text>
      <Flex mt={6} justifyContent="space-between">
        <NextLink href={course.url} prefetch={false}>
          <Link target="_blank" color="primary.200" href={course.url}>
            {course.url}
          </Link>
        </NextLink>
        <NextLink href={`/tutor/courses/${course.claveCurso}`} passHref>
          <Link href={`/tutor/courses/${course.claveCurso}`} fontWeight="600">
            Ver Estudiantes
          </Link>
        </NextLink>
      </Flex>
    </Box>
  );
}
