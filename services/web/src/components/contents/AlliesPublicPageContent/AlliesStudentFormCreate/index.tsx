import { useToast } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { backend } from "lib/constants/api";
import { useMutation } from "react-query";
import { AlliesStudentForm } from "../AlliesStudentForm";

interface IProps {
  onComplete?: (data) => void;
}

interface IValues {
  vanity_id: string;
}

export function AlliesStudentFormCreate({ onComplete }: IProps) {
  const { mutate } = useMutation<AxiosResponse, Error, IValues>((ally) =>
    axios.post(`${backend}/v1/ally/students`, ally, { withCredentials: true })
  );
  const toast = useToast();

  return (
    <AlliesStudentForm
      initialValues={{
        vanity_id: "",
      }}
      onSubmit={({ vanity_id }, actions) => {
        mutate(
          {
            vanity_id,
          },
          {
            onSuccess: ({ data }) => {
              actions.setSubmitting(false);
              toast({
                status: "success",
                title: "Estudiantes",
              });

              if (data.students) {
                onComplete(data.students);
              }
            },
            onError: () => {
              toast({
                status: "error",
                title: "No pudimos registrar el aliado",
                description: "Estudiantes",
              });
              actions.setSubmitting(false);
            },
          }
        );
      }}
    />
  );
}
