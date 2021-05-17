import React from "react";
import NextLink from "next/link";
import { Box, Text, Link, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface IProps {
  course: any;
}

export function CourseCard({ course }: IProps) {
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
      <Box mt={6}>
        <NextLink href={course.url} prefetch={false}>
          <Link target="_blank" color="primary.200" href={course.url}>
            {course.url}
          </Link>
        </NextLink>
      </Box>
      <Button colorScheme="primary" mt="5" onClick={() => router.push(`/tutor/courses/${course.id}`)}>Ver curso</Button>
    </Box>
  );
}
