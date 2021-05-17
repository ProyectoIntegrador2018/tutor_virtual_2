import React from "react";
import { Box, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetcherV1 } from "fetchers";
import { LoadingSpinner } from "components/modules/LoadingSpinner";
import { CourseCard } from "./CourseCard";

interface IProps {
  myCoursesURL: string;
}

export function MyCoursesPageContent({ myCoursesURL }: IProps) {
  const { data, isLoading } = useQuery(myCoursesURL, () =>
    fetcherV1.get(myCoursesURL).then((res) => res.data)
  );
  if (isLoading) {
    return <LoadingSpinner />;
  }

  const { courses } = data;
  if (!courses || courses.length === 0) {
    return (
      <Box>
        <Heading>Mis cursos</Heading>
        <Text mt={8} fontSize="xl" textAlign="center">
          No tienes ningún curso asignado...
        </Text>
      </Box>
    );
  }
  return (
    <Box>
      <Heading fontSize="5xl">Mis cursos</Heading>
      <SimpleGrid mt={10} spacing={8} columns={[1, 1, null, 2]}>
        {courses.map((c) => (
          <CourseCard course={c} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
