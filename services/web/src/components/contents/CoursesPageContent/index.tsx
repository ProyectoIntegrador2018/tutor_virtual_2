import { Box,
  useToast,
  Button,
  Flex,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  Stack,
  ModalBody,
  ModalFooter,
  useDisclosure, } from "@chakra-ui/react";
import axios from "axios";
import { backend } from "lib/constants/api";
import { Course } from "lib/types/course";
import { useMutation } from "react-query";
import { CourseForm } from "./CourseForm";
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { fetcherV1 } from "fetchers";
import { CoursesTable } from "./CoursesTable";
import { NoCoursesText } from "./NoCoursesText";
import { ExcelUploaderSection } from "components/modules/ExcelUploaderSection";
import { parseISO, format } from "date-fns";

export function CoursesPageContent() {
  const toast = useToast();
  const [page, setPage] = useState(0);
  const [pageSize] = useState(20);
  const { data, isLoading, isFetched } = useQuery<
    { courses: Course[] },
    Error,
    { courses: Course[] }
  >(["courses", page, pageSize], () =>
    fetcherV1
      .get("/courses", {
        params: {
          page,
          pageSize,
        },
      })
      .then((res) => res.data)
  );
  const cardData = data;
  const tableData = useMemo(() => data, [page, pageSize, isLoading, isFetched]);
  const { mutate } = useMutation<Course, Error, Course>((newCourse) =>
    axios.post(`${backend}/v1/courses`, newCourse, { withCredentials: true })
  );
  const { isOpen: isOpenCreate, onOpen: onOpenCreate, onClose: onCloseCreate } = useDisclosure();
  const { isOpen: isOpenUpload, onOpen: onOpenUpload, onClose: onCloseUpload } = useDisclosure();

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb={10}>
        <Heading fontSize="5xl">Cursos</Heading>
        <Stack direction={"row"} spacing={2}>
          <Button onClick={onOpenCreate}>Crear Curso</Button>
          <Button onClick={onOpenUpload}>Subir Cursos</Button>
        </Stack>
      </Flex>
      {isLoading && <Spinner />}
      {tableData !== undefined && <CoursesTable data={tableData.courses} />}
      <Flex
        flexDirection="row"
        justifyContent="space-around"
        w="30%"
        mx="auto"
        mt={6}
      >
        {page !== 0 && (
          <Button onClick={() => setPage(page > 0 ? page - 1 : 0)}>
            Atrás
          </Button>
        )}
        {tableData !== undefined && tableData.courses.length >= pageSize && (
          <Button onClick={() => setPage(page + 1)}>Siguiente</Button>
        )}
      </Flex>
      <Modal isOpen={isOpenUpload} onClose={onCloseUpload}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <ExcelUploaderSection
              onSubmit={onCloseUpload}
              urlPath="/courses/upload-excel"
              httpMethod="POST"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseUpload}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenCreate} onClose={onCloseCreate}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <CourseForm
              initialValues={{
                name: "",
                topic: "",
                duration: 0,
                recognitionType: "",
                url: "",
                startDate: "",
                endDate: ""
              }}
              onSubmit={(
                { name, topic, duration, recognitionType, url, startDate, endDate },
                actions
              ) => {
                mutate(
                  {
                    name,
                    topic,
                    duration,
                    recognitionType,
                    url,
                    startDate,
                    endDate
                  },
                  {
                    onSuccess: () => {
                      actions.setSubmitting(false);
                      toast({
                        status: "success",
                        title: "Curso registrado con exito",
                      });
                    },
                    onError: () => {
                      toast({
                        status: "error",
                        title: "No pudimos registrar el curso",
                        description: "Vuelva a intentar más tarde",
                      });
                      actions.setSubmitting(false);
                    },
                  }
                );
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseCreate}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
