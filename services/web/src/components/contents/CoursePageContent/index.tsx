import { Box, Heading, Text } from "@chakra-ui/react";
import { fetcherV1 } from "fetchers";
import { Course } from "lib/types/course";
import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { useAuth } from "lib/hooks/useAuth";
import { UserRoleName } from "lib/types/role";
import { LoadingSpinner } from "components/modules/LoadingSpinner";
import { CourseStudent } from "../MyCoursesPageContent/CourseStudent";
import { TutorsInCourse } from "./TutorsInCourse";

interface IProps {
  courseID: string;
}

export function CoursePageContent({ courseID }: IProps) {
  const id = courseID;
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
  const { loading: isAuthLoading, role } = useAuth();
  const courseData = useMemo(() => data, [isLoading, isFetched]);

  if (isAuthLoading || isLoading) {
    return <LoadingSpinner />;
  }

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
            </Box>
          </Box>
        </>
      )}
      {role === UserRoleName.SUPERVISOR && (
        <TutorsInCourse courseID={courseID} />
      )}
      <Box mt={8}>
        <CourseStudent id={id} />
      </Box>
    </Box>
  );
}
