import React, { useMemo } from "react";
import { Box, Table, Th, Tr, Td, Thead, Tbody } from "@chakra-ui/react";
import { useTable } from "react-table";
import { User } from "lib/types/user";

interface IProps {
  tutors: User[];
}

export function TutorsTable({ tutors }: IProps) {
  const columns = useMemo(
    () => [
      {
        Header: "Nombre",
        accessor: "firstName",
      },
      {
        Header: "Apellidos",
        accessor: (row: User) => `${row.paternalName} ${row.maternalName}`,
      },
      {
        Header: "Correo",
        accessor: "email",
      },
      {
        Header: "Contraseña",
        accessor: "password",
      },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns: columns as any, data: tutors });

  return (
    <Box p={2} mt={4}>
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
