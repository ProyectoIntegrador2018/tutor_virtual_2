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
import { Button } from "../../../elements/Button";

const schema = Yup.object({
  email: Yup.string()
    .email("Escribe un correo válido!")
    .required("Por favor escribe tu correo!"),
  password: Yup.string().required("Por favor escribe tu contraseña!"),
});

interface IValues {
  email: string;
  password: string;
}

interface IProps {
  initialValues: IValues;
  onSubmit: (vals: IValues, actions: FormikHelpers<IValues>) => void;
}

export function LoginForm({ initialValues, onSubmit }: IProps) {
  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {(formProps) => (
        <Form>
          <Stack spacing={4}>
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
            <Button
              isLoading={formProps.isSubmitting}
              type="submit"
              colorVariant="primary"
            >
              Entrar
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
