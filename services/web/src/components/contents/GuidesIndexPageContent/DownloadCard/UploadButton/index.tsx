import React, { useRef } from "react";
import { Button, Input, useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { fetcherV1 } from "fetchers";

interface IProps {
  filename: string;
}

export function UploadButton({ filename }: IProps) {
  const ref = useRef<HTMLInputElement | undefined>();
  const toast = useToast();
  const { mutate, isLoading } = useMutation(
    (args: FormData) =>
      fetcherV1.post("/guides", args, {
        headers: {
          // We hardcode the filename in a header to be able to access it while
          // the file is being saved.
          storewithfilename: filename,
        },
      }),
    {
      onSuccess: () => {
        toast({
          status: "success",
          title: "La guía se ha subido con éxito",
          description:
            "Ya está listo para ser descargado por cualquier persona.",
        });
      },
      onError: () => {
        toast({
          status: "error",
          title: "Hubo un error al subir la gúia",
          description: "Por favor intenta de nuevo.",
        });
      },
    }
  );
  return (
    <>
      <Input
        onChange={(e) => {
          const file = e.target.files[0];
          const formData = new FormData();
          formData.append("guideForUser", file);
          formData.append("filename", filename);
          mutate(formData);
        }}
        ref={ref}
        type="file"
        hidden
      />
      <Button
        onClick={() => {
          if (ref.current) {
            ref.current.click();
          }
        }}
        isLoading={isLoading}
        variant="outline"
        colorScheme="primary"
      >
        Subir guía
      </Button>
    </>
  );
}
