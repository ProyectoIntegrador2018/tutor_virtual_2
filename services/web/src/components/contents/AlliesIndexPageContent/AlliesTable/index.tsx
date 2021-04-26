import React, { useMemo } from "react";
import { Box, Table, Th, Tr, Td, Thead, Tbody } from "@chakra-ui/react";
import { useTable } from "react-table";
import { Ally } from "lib/types/ally";

interface IProps {
  data: Ally[];
}

export function AlliesTable({ data }: IProps) {
  const columns = useMemo(
    () => [
      {
        Header: "id",
        accessor: "vanity_id",
      },
      {
        Header: "Nombre",
        accessor: "name",
      },
      {
        Header: "Giro Soc",
        accessor: "type",
      },
      {
        Header: "Correo",
        accessor: "email",
      },
      {
        Header: "Contacto",
        accessor: "contact",
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
