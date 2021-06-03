import React, { useMemo } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetcherV1 } from "fetchers";
import { CoursesTable } from "../CoursesPageContent/CoursesTable";

interface IProps {
  season_id: string;
}

export function CoursesBySeasonPageContent({ season_id }: IProps) {
  const { data, isLoading, isFetched } = useQuery(
    ["/coursesBySeason", season_id],
    () =>
      fetcherV1
        .get("/coursesBySeason", { params: { season_id } })
        .then((res) => res.data)
  );
  const tableData = useMemo(() => data, [isLoading, isFetched]);

  return (
    <Box>
      <Heading fontSize="5xl">Cursos</Heading>
      {tableData !== undefined && <CoursesTable data={tableData.courses} />}
    </Box>
  );
}
