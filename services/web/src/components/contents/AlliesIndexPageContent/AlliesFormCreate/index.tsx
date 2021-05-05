import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { backend } from "lib/constants/api";
import { Ally } from "lib/types/ally";
import { useMutation } from "react-query";
import { AlliesForm } from "../AlliesForm";

interface IProps {
  onComplete?: () => void;
}

export function AlliesFormCreate({ onComplete }: IProps) {
  const { mutate } = useMutation<Ally, Error, Partial<Ally>>((newCourse) =>
    axios.post(`${backend}/v1/allies`, newCourse, { withCredentials: true })
  );
  const toast = useToast();

  return (
    <AlliesForm
      initialValues={{
        name: "",
        vanity_id: "",
        type: "",
        contact: "",
        email: "",
      }}
      onSubmit={({ name, vanity_id, type, contact, email }, actions) => {
        mutate(
          {
            name,
            vanity_id,
            type,
            contact,
            email,
          },
          {
            onSuccess: () => {
              actions.setSubmitting(false);
              toast({
                status: "success",
                title: "Curso registrado con exito",
              });
              onComplete?.();
            },
            onError: () => {
              toast({
                status: "error",
                title: "No pudimos registrar el aliado",
                description: "Vuelva a intentar más tarde",
              });
              actions.setSubmitting(false);
            },
          }
        );
      }}
    />
  );
}
