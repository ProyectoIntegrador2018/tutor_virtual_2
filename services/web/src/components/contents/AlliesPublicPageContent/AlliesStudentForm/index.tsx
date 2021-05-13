import React from "react";
import * as Yup from "yup";
import {
  FormControl,
  Box,
  Flex,
  Input,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import { Button } from "../../../elements/Button";

interface IValues {
  vanity_id: string;
}

interface IProps {
  initialValues: IValues;
  onSubmit: (vals: IValues, actions: FormikHelpers<IValues>) => void;
}

const schema = Yup.object({
  vanity_id: Yup.string().required("Por favor escribe tu ID!"),
});

export function AlliesStudentForm({ initialValues, onSubmit }: IProps) {
  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {(formProps) => (
        <Form>
          <Box mb={4}>
            <Field name="vanity_id">
              {({ field, form }: FieldProps<any, IValues>) => (
                <FormControl
                  isInvalid={form.errors.vanity_id && form.touched.vanity_id}
                >
                  <FormLabel htmlFor="vanity_id">Identificador</FormLabel>
                  <Input
                    {...field}
                    id="vanity_id"
                    placeholder="Identificador"
                  />
                  <FormErrorMessage>{form.errors.vanity_id}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Box>
          <Flex w="100%" flexDir="column">
            <Button
              isLoading={formProps.isSubmitting}
              type="submit"
              colorVariant="primary"
            >
              Ingresar
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}
