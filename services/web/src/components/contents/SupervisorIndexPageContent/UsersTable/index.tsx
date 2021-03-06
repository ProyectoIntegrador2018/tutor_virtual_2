import React, { useMemo } from "react";
import {
  Box,
  Table,
  Th,
  Tr,
  Td,
  Thead,
  Tbody,
  Switch,
  useToast,
} from "@chakra-ui/react";
import { useTable } from "react-table";
import { useMutation } from "react-query";
import { User } from "lib/types/user";
import { fetcherV1 } from "fetchers";

interface IProps {
  data: User[];
  currentSelectedRole: string;
  refetchData: () => void;
}

export function UsersTable({ data, currentSelectedRole, refetchData }: IProps) {
  const { mutate } = useMutation<
    User,
    Error,
    { email: string; enable: boolean }
  >((requestData) =>
    fetcherV1.put("/users/tutor/enable", requestData).then((res) => res.data)
  );
  const toast = useToast();
  const columns = useMemo(
    () => [
      {
        Header: "Nombre",
        accessor: "firstName",
      },
      {
        Header: "Apellido paterno",
        accessor: "paternalName",
      },
      {
        Header: "Apellido materno",
        accessor: "maternalName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Cuenta activa",
        accessor: (row) =>
          row.hasAccountEnabled === true ? "Activa" : "No activa",
      },
      {
        Header: () =>
          currentSelectedRole === "TUTOR" ? "Habilitar cuenta" : () => null,
        accessor: (row) =>
          currentSelectedRole === "TUTOR" ? (
            <Switch
              defaultChecked={row.hasAccountEnabled}
              onChange={(e) => {
                const on = e.target.checked;
                mutate(
                  { email: row.email, enable: on },
                  {
                    onError: () => {
                      toast({
                        status: "error",
                        title: "Oops!",
                        description: "Ocurrió un error, intenta de nuevo!",
                      });
                    },
                    onSuccess: () => {
                      toast({
                        status: "success",
                        title: `${
                          !on ? "Deshabilitaste" : "Habilitaste"
                        } la cuenta de ${row.firstName}`,
                        description: `Haz ${
                          !on ? "deshabilitado" : "habilitado"
                        } la cuenta de ${row.firstName} con éxito.`,
                      });
                      refetchData();
                    },
                  }
                );
              }}
            />
          ) : null,
        id: "enableAccount",
      },
    ],
    [currentSelectedRole]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns: columns as any, data });
  return (
    <Box>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
