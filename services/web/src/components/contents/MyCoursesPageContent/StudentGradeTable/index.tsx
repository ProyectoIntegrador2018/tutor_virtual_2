import React, { useMemo } from "react";
import { Box, Table, Th, Tr, Td, Thead, Tbody } from "@chakra-ui/react";
import { useTable } from "react-table";
import { Grade } from "lib/types/grade";

interface IProps {
  data: Grade[];
}

export function StudentGradeTable({ data }: IProps) {
  const columns = useMemo(
    () => [
      {
        Header: "Num. Actividad",
        accessor: "activity",
        Cell: (cell) => cell.row.values.activity + 1,
      },

      {
        Header: "Calificacion",
        accessor: "grade",
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
