import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Tabs,
  Spinner,
  Button,
  Flex,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetcherV1 } from "fetchers";
import { User } from "lib/types/user";
import { UsersTable } from "./UsersTable";
import { setUserRoleFromTab } from "./helpers";

export function SupervisorIndexPageContent() {
  const [userRole, setUserRole] = useState("TUTOR");
  const [page, setPage] = useState(0);
  const [pageSize] = useState(30);
  const { data, isLoading, refetch, isFetched } = useQuery<
    { users: User[] },
    Error,
    { users: User[] }
  >(["users", userRole, page, pageSize], () =>
    fetcherV1
      .get("/users", {
        params: {
          roleName: userRole,
          page,
          pageSize,
        },
      })
      .then((res) => res.data)
  );
  const tableData = useMemo(() => data, [
    userRole,
    page,
    pageSize,
    isLoading,
    isFetched,
  ]);
  return (
    <Box>
      <Heading
        mb={10}
        fontSize="5xl"
        textAlign={["center", null, null, "left"]}
      >
        Tus tutores
      </Heading>
      <Tabs onChange={(index) => setUserRole(setUserRoleFromTab(index))}>
        <TabList>
          <Tab>Tutores</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{null}</TabPanel>
        </TabPanels>
      </Tabs>
      {isLoading && <Spinner />}
      {tableData !== undefined && (
        <UsersTable
          refetchData={() => refetch()}
          currentSelectedRole={userRole}
          data={tableData.users}
        />
      )}
      <Flex
        flexDirection="row"
        justifyContent="space-around"
        w="30%"
        mx="auto"
        mt={6}
      >
        {page !== 0 && (
          <Button onClick={() => setPage(page > 0 ? page - 1 : 0)}>
            Atrás
          </Button>
        )}
        {tableData !== undefined && tableData.users.length >= pageSize && (
          <Button onClick={() => setPage(page + 1)}>Siguiente</Button>
        )}
      </Flex>
    </Box>
  );
}
