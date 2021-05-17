import { Box, Heading, Link, Text } from "@chakra-ui/react";
import { fetcherV1 } from "fetchers";
import { Course } from "lib/types/course";
import NextLink from "next/link";
import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { CourseStudent } from "../MyCoursesPageContent/CourseStudent";

export function CoursePageContent(props) {
  const id = props.courseID;
  const { data, isLoading, isFetched } = useQuery<
    { course: Course },
    Error,
    { course: Course }
  >(["courses", id], () =>
    fetcherV1
      .get("/course", {
        params: {
          id,
        },
      })
      .then((res) => res.data)
  );
  const courseData = useMemo(() => data, [isLoading, isFetched]);

  return (
    <Box>
      {courseData && courseData.course && (
        <>
          <Box textAlign="center">
            <Heading fontSize="5xl">{courseData.course.name}</Heading>
            <Heading mb={2} fontSize="xl" mt={3}>
              [{courseData.course.claveCurso}]
            </Heading>
          </Box>

          <Box mt={5}>
            <Heading mb={2} fontSize="xl">
              Datos del curso
            </Heading>

            <Box p={6} boxShadow="xl" borderRadius="xl">
              <Text mb={2} fontSize="md" fontStyle="italic">
                Fecha de inicio: {courseData.course.startDate}
              </Text>
              <Text mb={2} fontSize="md" fontStyle="italic">
                Fecha de fin: {courseData.course.endDate}
              </Text>
              <Box mt={6}>
                <NextLink href={courseData.course.url} prefetch={false}>
                  <Link
                    target="_blank"
                    color="primary.200"
                    href={courseData.course.url}
                  >
                    {courseData.course.url}
                  </Link>
                </NextLink>
              </Box>
            </Box>
          </Box>
        </>
      )}
      <Box mt={8}>
        <CourseStudent id={id} />
      </Box>
    </Box>
  );
}
