import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetcherV1 } from "fetchers";
import { User } from "lib/types/user";
import { TutorsTable } from "./TutorsTable";

interface IProps {
  courseID: string;
}

export function TutorsInCourse({ courseID }: IProps) {
  const { data, isLoading } = useQuery<{ tutors: User[] }>(
    "/courses/tutors",
    () =>
      fetcherV1
        .get("/courses/tutors", {
          params: {
            courseID,
          },
        })
        .then((res) => res.data)
  );
  if (isLoading) {
    return null;
  }
  return (
    <Box mt={8}>
      <Text fontSize="xl" fontWeight={700}>
        Tutores
      </Text>
      <TutorsTable tutors={data.tutors} />
    </Box>
  );
}
