import React from "react";
import { FormControl, Input, FormLabel, FormErrorMessage, Stack } from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import { Button } from "../../../elements/Button";

interface IValues {
	name: string;
	topic: string;
	duration: number;
	recognitionType: string;
	url: string;
	seasonID: number;
}

interface IProps {
	initialValues: IValues;
	onSubmit: (vals: IValues, actions: FormikHelpers<IValues>) => void;
}

export function CourseForm({ initialValues, onSubmit }: IProps) {
	return (
		<Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
		>
			{(formProps) => (
        <Form>
          <Stack spacing={4}>
            <Field name="name">
              {({ field }: FieldProps<any, IValues>) => (
                <FormControl>
                  <FormLabel htmlFor="name">Nombre</FormLabel>
                  <Input {...field} id="name" placeholder="Nombre" />
                </FormControl>
              )}
            </Field>
            <Field name="topic">
              {({ field }: FieldProps<any, IValues>) => (
                <FormControl>
                  <FormLabel htmlFor="topic">Materia</FormLabel>
                  <Input {...field} id="topic" placeholder="Materia" />
                </FormControl>
              )}
            </Field>
            <Field name="duration">
              {({ field }: FieldProps<any, IValues>) => (
                <FormControl>
                  <FormLabel htmlFor="duration">Duración</FormLabel>
                  <Input {...field} id="duration" placeholder="Duración" />
                </FormControl>
              )}
            </Field>
            <Field name="recognitionType">
              {({ field }: FieldProps<any, IValues>) => (
                <FormControl>
                  <FormLabel htmlFor="recognitionType">Tipo de Reconocimiento</FormLabel>
                  <Input {...field} id="recognitionType" placeholder="Tipo de Reconocimiento" />
                </FormControl>
              )}
            </Field>
            <Field name="url">
              {({ field }: FieldProps<any, IValues>) => (
                <FormControl>
                  <FormLabel htmlFor="url">Url</FormLabel>
                  <Input {...field} id="url" placeholder="Url" />
                </FormControl>
              )}
            </Field>
            <Field name="seasonID">
              {({ field }: FieldProps<any, IValues>) => (
                <FormControl>
                  <FormLabel htmlFor="seasonID">ID de Temporada</FormLabel>
                  <Input {...field} id="seasonID" placeholder="ID de Temporada" />
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