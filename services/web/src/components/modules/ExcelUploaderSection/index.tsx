import React, { useState, useRef, useCallback } from "react";
import { Box, BoxProps, Input, FormLabel, useToast } from "@chakra-ui/react";
import { Button } from "components/elements/Button";
import { fetcherV1 } from "fetchers/";
import { FileInfo } from "./FileInfo";
import { TValidHttpMethod } from "./types";

interface IProps extends BoxProps {
  /**
   * The api URL path that specifies where this excel file is going to be uploaded.
   * e.g. /courses/excel
   */
  urlPath: string;
  /**
   * The HTTP method to use in the request.
   */
  httpMethod: TValidHttpMethod;
  /**
   * Optional on submit callback;
   */
  onSubmit?: () => void;
}

/**
 * Component that lets you upload an excel file to the specified _urlPath_.
 */
export function ExcelUploaderSection({
  httpMethod,
  urlPath,
  onSubmit,
  ...rest
}: IProps) {
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef(null);
  const toast = useToast();
  const handleSelectFile = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, [inputRef.current]);
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedFile(e.target.files[0]);
      setIsFilePicked(true);
    },
    []
  );
  const handleUploadButton = useCallback(() => {
    const formData = new FormData();
    formData.append("excelFile", selectedFile);
    fetcherV1({ method: httpMethod, url: urlPath, data: formData })
      .then(() => {
        toast({
          status: "success",
          title: "Archivo subido con éxito",
          description: `El archivo ${selectedFile.name} ha sido guardado con éxito.`,
        });
        if (onSubmit) {
          onSubmit();
        }
      })
      .catch(() => {
        toast({
          status: "error",
          title: "Oops! Hubo un error",
          description: "Por favor intenta de nuevo!",
        });
      });
  }, [selectedFile]);
  return (
    <Box
      {...rest}
      display="flex"
      borderRadius="lg"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={5}
      h="200px"
      boxShadow="lg"
    >
      {!isFilePicked && (
        <FormLabel htmlFor="excelFileUpload">
          Selecciona el archivo que deseas subir
        </FormLabel>
      )}
      {selectedFile && <FileInfo file={selectedFile} />}
      <Input
        ref={inputRef}
        hidden
        onChange={handleInputChange}
        type="file"
        id="excelFileUpload"
      />
      {isFilePicked && (
        <Button onClick={handleUploadButton} colorVariant="primary" mt={4}>
          Subir archivo
        </Button>
      )}
      <Button
        variant={isFilePicked ? "ghost" : "outline"}
        onClick={handleSelectFile}
        mt={3}
        colorVariant="primary"
      >
        Seleccionar archivo
      </Button>
    </Box>
  );
}
