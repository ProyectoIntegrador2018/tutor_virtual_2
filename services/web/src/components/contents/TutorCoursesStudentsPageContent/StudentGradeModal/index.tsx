import {
  Modal,
  ModalOverlay,
  ModalBody,
  Stack,
  ModalContent,
  Box,
  Heading,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { StudentGradeTable } from "components/contents/MyCoursesPageContent/StudentGradeTable";
import { LoadingSpinner } from "components/modules/LoadingSpinner";
import { fetcherV1 } from "fetchers";
import React from "react";
import { useQuery } from "react-query";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  student: string;
}

export function StudentGradeModal({ isOpen, onClose, student }: IProps) {
  const { data, isLoading } = useQuery(["/student/grades", student], () =>
    fetcherV1
      .get("/student/grades", {
        params: {
          student,
        },
      })
      .then((res) => res.data)
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Stack spacing={4} p={4}>
            {Object.keys(data.grades).map((key) => (
              <Box>
                <Heading fontSize="2xl">{key}</Heading>
                <StudentGradeTable data={data.grades[key]} />
              </Box>
            ))}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
