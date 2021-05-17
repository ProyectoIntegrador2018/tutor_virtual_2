import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { StudentGradeTable } from "../StudentGradeTable";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockData = [
  {
    grade: 100,
    activity: 1,
    id: "2",
  },
  {
    grade: 94,
    activity: 2,
    id: "2",
  },
  {
    grade: 83,
    activity: 3,
    id: "2",
  },
];

export function StudentGradeModal({ isOpen, onClose }: IProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <StudentGradeTable data={mockData} />
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
