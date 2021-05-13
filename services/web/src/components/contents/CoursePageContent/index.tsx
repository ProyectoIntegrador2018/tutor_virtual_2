import React, { useMemo, useState } from "react";
import { Box, useToast, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import { backend } from "lib/constants/api";
import { Course } from "lib/types/course";
import { useMutation, useQuery } from "react-query";
import { fetcherV1 } from "fetchers";
import { useAuth } from "lib/hooks/useAuth";
import { UserRoleName } from "lib/types/role";

export function CoursePageContent(props) {
  const { role } = useAuth();
  //const isSuperadmin = UserRoleName.SUPERADMIN === role;
  const toast = useToast();
  const [page, setPage] = useState(0);
  const [pageSize] = useState(20);
  const [id] = useState(props.courseID);
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
      {courseData !== undefined && (
        <>
          <Heading fontSize="5xl">Curso: {courseData.course.name} </Heading>
          <Text fontSize="sm" mt={8}>
            {courseData.course.startDate} - {courseData.course.endDate}
          </Text>
          <Text fontSize="sm">
            Clave: {courseData.course.claveCurso}
          </Text>
          <Text fontSize="sm">
            URL: {courseData.course.url}
          </Text>
          <Text fontSize="sm">
            Tipo de reconocimiento: {courseData.course.recognitionType}
          </Text>
        </>
      )}
    </Box>
  );
}
