import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import { LoadingSpinner } from "components/modules/LoadingSpinner";
import { fetcherV1 } from "fetchers";
import React from "react";
import { useQuery } from "react-query";
import { StudentGradeTable } from "../StudentGradeTable";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  student: string;
  course: string;
}

export function StudentGradeModal({
  isOpen,
  onClose,
  course,
  student,
}: IProps) {
  const { data, isLoading } = useQuery(
    ["/student/course/grades", student],
    () =>
      fetcherV1
        .get("/student/course/grades", {
          params: {
            course,
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
          {data && data.grades && <StudentGradeTable data={data.grades} />}
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
