import React, { useMemo, useState } from "react";
import {
  Box,
  Table,
  Th,
  Tr,
  Td,
  Thead,
  Tbody,
  useDisclosure,
} from "@chakra-ui/react";
import { useTable } from "react-table";
import { Student } from "lib/types/student";
import { Button } from "components/elements/Button";
import { StudentGradeModal } from "../StudentGradeModal";

interface IProps {
  data: Student[];
  course: string;
}

export function StudentsTable({ data, course }: IProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [student, setStudent] = useState(null);
  const columns = useMemo(
    () => [
      {
        accessor: "id",
      },
      {
        Header: "Nombre",
        accessor: "name",
      },

      {
        Header: "Apellidos",
        accessor: (row: Student) => `${row.paternal_name} ${row.maternal_name}`,
      },
      {
        Header: "Usuario",
        accessor: "username",
      },
      {
        Header: "correo",
        accessor: "email",
      },
      {
        Header: "contraseña",
        accessor: "password",
      },
      {
        Header: "Calificaciones",
        accessor: "calificaciones",
        Cell: (cell) => (
          <Button
            colorVariant="primary"
            type="button"
            onClick={() => {
              setStudent(cell.row.values.id);
              onOpen();
            }}
          >
            Ver Calificaciones
          </Button>
        ),
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
  } = useTable({
    columns: columns as any,
    data,
    initialState: { hiddenColumns: ["id"] },
  });
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
      {student && (
        <StudentGradeModal
          isOpen={isOpen}
          onClose={onClose}
          student={student}
          course={course}
        />
      )}
    </Box>
  );
}
