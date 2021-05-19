import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { ExcelUploaderSection } from "components/modules/ExcelUploaderSection";
import React from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  course_id: string;
}

export function GradeModal({ isOpen, onClose, course_id }: IProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <ExcelUploaderSection
            onSubmit={onClose}
            urlPath="/grades/load-from-excel"
            httpMethod="POST"
            params={{ course_id }}
          />
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
