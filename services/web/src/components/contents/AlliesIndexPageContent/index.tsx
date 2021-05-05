import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { ExcelUploaderSection } from "components/modules/ExcelUploaderSection";
import { fetcherV1 } from "fetchers";
import { Ally } from "lib/types/ally";
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { AlliesTable } from "./AlliesTable";

export function AlliesIndexPageContent() {
  const [page, setPage] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pageSize] = useState(20);
  const { data, isLoading, isFetched } = useQuery<
    { allies: Ally[] },
    Error,
    { allies: Ally[] }
  >(["allies", page, pageSize], () =>
    fetcherV1
      .get("/allies", {
        params: {
          page,
          pageSize,
        },
      })
      .then((res) => res.data)
  );
  const tableData = useMemo(() => data, [page, pageSize, isLoading, isFetched]);
  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb={10}>
        <Heading fontSize="5xl">Aliados</Heading>
        <Button onClick={onOpen}>Subir Aliados</Button>
      </Flex>
      {isLoading && <Spinner />}
      {tableData !== undefined && <AlliesTable data={tableData.allies} />}
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
        {tableData !== undefined && tableData.allies.length >= pageSize && (
          <Button onClick={() => setPage(page + 1)}>Siguiente</Button>
        )}
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <ExcelUploaderSection
              onSubmit={onClose}
              urlPath="/ally/upload-excel"
              httpMethod="POST"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
