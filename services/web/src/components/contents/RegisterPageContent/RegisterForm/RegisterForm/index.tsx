import React from "react";
import {
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Stack,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Button } from "../../../../elements/Button";

const schema = Yup.object({
  firstName: Yup.string().required("Por favor escribe tu nombre!"),
  paternalName: Yup.string().required(
    "Por favor escribe tu apelllido paterno!"
  ),
  maternalName: Yup.string().required(
    "Por favor escribe tu apelllido materno!"
  ),
  email: Yup.string()
    .email("Escribe un correo válido!")
    .required("Por favor escribe tu correo!"),
  password: Yup.string().required("Por favor escribe tu contraseña!"),
  confirmPassword: Yup.string().required("Por favor confirma tu contraseña!").oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir'),
});

interface IValues {
  firstName: string;
  paternalName: string;
  maternalName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IProps {
  initialValues: IValues;
  onSubmit: (vals: IValues, actions: FormikHelpers<IValues>) => void;
}

export function RegisterForm({ initialValues, onSubmit }: IProps) {
  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {(formProps) => (
        <Form>
          <Stack spacing={4}>
            <Field name="firstName">
              {({ field, form }: FieldProps<any, IValues>) => (
                <FormControl
                  isInvalid={form.errors.firstName && form.touched.firstName}
                >
                  <FormLabel htmlFor="firstName">Nombre</FormLabel>
                  <Input {...field} id="firstName" placeholder="Eugenio" />
                  <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="paternalName">
              {({ field, form }: FieldProps<any, IValues>) => (
                <FormControl
                  isInvalid={
                    form.errors.paternalName && form.touched.paternalName
                  }
                >
                  <FormLabel htmlFor="paternalName">Apellido paterno</FormLabel>
                  <Input {...field} id="paternalName" placeholder="Garza" />
                  <FormErrorMessage>
                    {form.errors.paternalName}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="maternalName">
              {({ field, form }: FieldProps<any, IValues>) => (
                <FormControl
                  isInvalid={
                    form.errors.maternalName && form.touched.maternalName
                  }
                >
                  <FormLabel htmlFor="maternalName">Apellido materno</FormLabel>
                  <Input {...field} id="maternalName" placeholder="Sada" />
                  <FormErrorMessage>
                    {form.errors.maternalName}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="email">
              {({ field, form }: FieldProps<any, IValues>) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel htmlFor="email">Correo</FormLabel>
                  <Input {...field} id="email" placeholder="correo@itesm.mx" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }: FieldProps<any, IValues>) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel htmlFor="password">Contraseña</FormLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="es un secreto..."
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="confirmPassword">
              {({ field, form }: FieldProps<any, IValues>) => (
                <FormControl
                  isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}
                >
                  <FormLabel htmlFor="confirmPassword">Confirma tu contraseña</FormLabel>
                  <Input
                    {...field}
                    id="confirmPassword"
                    type="password"
                    placeholder="una vez más..."
                  />
                  <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
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
