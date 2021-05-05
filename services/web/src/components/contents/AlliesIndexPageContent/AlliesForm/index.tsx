import React from "react";
import {
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Stack,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import { Button } from "../../../elements/Button";

interface IValues {
  name: string;
  vanity_id: string;
  email: string;
  type: string;
  contact: string;
}

interface IProps {
  initialValues: IValues;
  onSubmit: (vals: IValues, actions: FormikHelpers<IValues>) => void;
}

export function AlliesForm({ initialValues, onSubmit }: IProps) {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formProps) => (
        <Form>
          <Stack spacing={4}>
            <Field name="vanity_id">
              {({ field }: FieldProps<any, IValues>) => (
                <FormControl>
                  <FormLabel htmlFor="ID">ID</FormLabel>
                  <Input {...field} id="ID" placeholder="ID" />
                </FormControl>
              )}
            </Field>
            <Field name="name">
              {({ field }: FieldProps<any, IValues>) => (
                <FormControl>
                  <FormLabel htmlFor="name">Nombre</FormLabel>
                  <Input {...field} id="name" placeholder="Nombre" />
                </FormControl>
              )}
            </Field>
            <Field name="type">
              {({ field }: FieldProps<any, IValues>) => (
                <FormControl>
                  <FormLabel htmlFor="type">Giro Soc</FormLabel>
                  <Input {...field} id="type" placeholder="Giro Soc" />
                </FormControl>
              )}
            </Field>
            <Field name="email">
              {({ field }: FieldProps<any, IValues>) => (
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input {...field} id="email" placeholder="Email" />
                </FormControl>
              )}
            </Field>
            <Field name="contact">
              {({ field }: FieldProps<any, IValues>) => (
                <FormControl>
                  <FormLabel htmlFor="contact">Contacto</FormLabel>
                  <Input {...field} id="contact" placeholder="Contacto" />
                </FormControl>
              )}
            </Field>
            <Button
              isLoading={formProps.isSubmitting}
              type="submit"
              colorVariant="primary"
            >
              Registrar
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
