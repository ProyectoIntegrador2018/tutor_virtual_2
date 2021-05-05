import React, { useEffect } from "react";
import { Button, useToast } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetcherV1 } from "fetchers";

interface IProps {
  filename: string;
}

export function DownloadButton({ filename }: IProps) {
  const toast = useToast();
  const { refetch, isError, data, isSuccess } = useQuery(
    ["/guides", filename],
    () =>
      fetcherV1.get("/guides", {
        params: {
          filename,
        },
        responseType: "blob",
      }),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    }
  );

  useEffect(() => {
    if (isSuccess && data) {
      const url = window.URL.createObjectURL(new Blob([data.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }, [isSuccess, data]);

  if (isError) {
    toast({
      status: "error",
      title: "Hubo un error al descargar el archivo",
      description: "El archivo que estás buscando no existe",
    });
  }

  return (
    <Button
      onClick={() => {
        refetch();
      }}
      colorScheme="primary"
    >
      Descargar guía
    </Button>
  );
}
