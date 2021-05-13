import React from "react";
import * as Yup from "yup";
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

const schema = Yup.object({
  name: Yup.string().required("Por favor escribe el nombre!"),
  vanity_id: Yup.number().required("Por favor escribe el ID!"),
  contact: Yup.string().optional(),
  email: Yup.string().email("Escribe un correo válido!").optional(),
  type: Yup.string().required("Por favor escribe el Giro Soc!"),
});

export function AlliesForm({ initialValues, onSubmit }: IProps) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={schema}
    >
      {(formProps) => (
        <Form>
          <Stack spacing={4}>
            <Field name="vanity_id">
              {({ field, form }: FieldProps<any, IValues>) => (
                <FormControl
                  isInvalid={form.errors.vanity_id && form.touched.vanity_id}
                >
                  <FormLabel htmlFor="vanity_id">ID</FormLabel>
                  <Input {...field} id="vanity_id" placeholder="ID" />
                  <FormErrorMessage>{form.errors.vanity_id}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="name">
              {({ field, form }: FieldProps<any, IValues>) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel htmlFor="name">Nombre</FormLabel>
                  <Input {...field} id="name" placeholder="Nombre" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="type">
              {({ field, form }: FieldProps<any, IValues>) => (
                <FormControl isInvalid={form.errors.type && form.touched.type}>
                  <FormLabel htmlFor="type">Giro Soc</FormLabel>
                  <Input {...field} id="type" placeholder="Giro Soc" />
                  <FormErrorMessage>{form.errors.type}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="email">
              {({ field, form }: FieldProps<any, IValues>) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input {...field} id="email" placeholder="Email" />

                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="contact">
              {({ field, form }: FieldProps<any, IValues>) => (
                <FormControl
                  isInvalid={form.errors.contact && form.touched.contact}
                >
                  <FormLabel htmlFor="contact">Contacto</FormLabel>
                  <Input {...field} id="contact" placeholder="Contacto" />
                  <FormErrorMessage>{form.errors.contact}</FormErrorMessage>
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
