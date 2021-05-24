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
import DatePicker from "components/elements/DatePicker";
import { Button } from "../../../elements/Button";

const schema = Yup.object({
  name: Yup.string().required("Porfavor escribe el nombre del curso!"),
  topic: Yup.string().required("Porfavor escribe la materia del curso!"),
  duration: Yup.number().required("Porfavor escribe la duración del curso!"),
  recognitionType: Yup.string().required(
    "Porfavor escribe el tipo de reconocimiento del curso!"
  ),
  url: Yup.string().required("Porfavor escribe el url del curso!"),
  claveCurso: Yup.string().required("Porfavor escribe la clave del curso!"),
  startDate: Yup.string().required("Porfavor selecciona la fecha de inicio!"),
  endDate: Yup.string().required("Porfavor selecciona la fecha de fin!"),
});

interface IValues {
  name: string;
  topic: string;
  duration: number;
  recognitionType: string;
  url: string;
  claveCurso: string;
  startDate: string;
  endDate: string;
}

interface IProps {
  initialValues: IValues;
  onSubmit: (vals: IValues, actions: FormikHelpers<IValues>) => void;
}

export function CourseForm({ initialValues, onSubmit }: IProps) {
  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {(formProps) => (
        <Form>
          <Stack spacing={4}>
            <Field name="claveCurso">
              {({ field, form }: FieldProps<any, IValues>) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel htmlFor="claveCurso">Clave del Curso</FormLabel>
                  <Input
                    {...field}
                    id="claveCurso"
                    placeholder="Clave del Curso"
                  />
                  <FormErrorMessage>{form.errors.claveCurso}</FormErrorMessage>
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
            <Field name="topic">
              {({ field, form }: FieldProps<any, IValues>) => (
                <FormControl
                  isInvalid={form.errors.topic && form.touched.topic}
                >
                  <FormLabel htmlFor="topic">Temática</FormLabel>
                  <Input {...field} id="topic" placeholder="Temática" />
                  <FormErrorMessage>{form.errors.topic}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="duration">
              {({ field, form }: FieldProps<any, IValues>) => (
                <FormControl
                  isInvalid={form.errors.duration && form.touched.duration}
                >
                  <FormLabel htmlFor="duration">Duración</FormLabel>
                  <Input {...field} id="duration" placeholder="Duración" />
                  <FormErrorMessage>{form.errors.duration}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="startDate">
              {({ field, form }: FieldProps<any, IValues>) => (
                <FormControl
                  isInvalid={form.errors.startDate && form.touched.startDate}
                >
                  <FormLabel htmlFor="startDate">Fecha de inicio</FormLabel>
                  <DatePicker
                    {...field}
                    id="startDate"
                    placeholder="Fecha de inicio"
                    onChange={(value) =>
                      formProps.setFieldValue("startDate", value)
                    }
                    value={formProps.values.startDate}
                  />
                  <FormErrorMessage>{form.errors.startDate}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="endDate">
              {({ field, form }: FieldProps<any, IValues>) => (
                <FormControl
                  isInvalid={form.errors.endDate && form.touched.endDate}
                >
                  <FormLabel htmlFor="endDate">Fecha de fin</FormLabel>
                  <DatePicker
                    {...field}
                    id="endDate"
                    placeholder="Fecha de fin"
                    onChange={(value) =>
                      formProps.setFieldValue("endDate", value)
                    }
                    value={formProps.values.endDate}
                  />
                  <FormErrorMessage>{form.errors.endDate}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="recognitionType">
              {({ field, form }: FieldProps<any, IValues>) => (
                <FormControl
                  isInvalid={
                    form.errors.recognitionType && form.touched.recognitionType
                  }
                >
                  <FormLabel htmlFor="recognitionType">
                    Tipo de Reconocimiento
                  </FormLabel>
                  <Input
                    {...field}
                    id="recognitionType"
                    placeholder="Tipo de Reconocimiento"
                  />
                  <FormErrorMessage>
                    {form.errors.recognitionType}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="url">
              {({ field, form }: FieldProps<any, IValues>) => (
                <FormControl isInvalid={form.errors.url && form.touched.url}>
                  <FormLabel htmlFor="url">Url</FormLabel>
                  <Input {...field} id="url" placeholder="Url" />
                  <FormErrorMessage>{form.errors.url}</FormErrorMessage>
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
