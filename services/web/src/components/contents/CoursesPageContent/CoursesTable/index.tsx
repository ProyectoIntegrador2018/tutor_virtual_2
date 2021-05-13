import React, { useMemo } from "react";
import { Box, Table, Th, Tr, Td, Thead, Tbody } from "@chakra-ui/react";
import { useTable } from "react-table";
import { Course } from "lib/types/course";
import { parseISO, format } from "date-fns";

interface IProps {
  data: Course[];
}

export function CoursesTable({ data }: IProps) {
  const columns = useMemo(
    () => [
      {
        Header: "Nombre",
        accessor: "name",
      },
      {
        Header: "Tematica",
        accessor: "topic",
      },
      {
        Header: "Duracion",
        accessor: "duration",
      },
      {
        Header: "Tipo de Rec",
        accessor: "recognitionType",
      },
      {
        Header: "Clave Curso",
        accessor: "claveCurso"
      },
      {
        Header: "Inicio",
        accessor: "startDate",
        Cell: ({ value }) => { 
          return format(parseISO(value), 'dd/MM/yyyy');
        },
      },
      {
        Header: "Fin",
        accessor: "endDate",
        Cell: ({ value }) => { 
          return format(parseISO(value), 'dd/MM/yyyy');
        },
      },
      {
        Header: "URL",
        accessor: "url",
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
