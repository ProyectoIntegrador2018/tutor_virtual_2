import React from "react";
import { FormControl, Input, FormLabel, Stack } from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import DatePicker from "components/elements/DatePicker";
import { Button } from "../../../elements/Button";

interface IValues {
  starting: string;
  ending: string;
}

interface IProps {
  initialValues: IValues;
  onSubmit: (vals: IValues, actions: FormikHelpers<IValues>) => void;
}

export function SeasonForm({ initialValues, onSubmit }: IProps) {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formProps) => (
        <Form>
          <Stack spacing={4}>
            <Field name="starting">
              {({ field }: FieldProps<any, IValues>) => (
                <FormControl>
                  <FormLabel htmlFor="starting">Fecha de inicio</FormLabel>
                  <DatePicker
                    {...field}
                    id="starting"
                    placeholder="Fecha de inicio"
                    onChange={(value) =>
                      formProps.setFieldValue("starting", value)
                    }
                    value={formProps.values.starting}
                  />
                </FormControl>
              )}
            </Field>
            <Field name="ending">
              {({ field }: FieldProps<any, IValues>) => (
                <FormControl>
                  <FormLabel htmlFor="ending">Fecha de terminacion</FormLabel>
                  <DatePicker
                    {...field}
                    id="ending"
                    placeholder="Fecha de terminacion"
                    onChange={(value) =>
                      formProps.setFieldValue("ending", value)
                    }
                    value={formProps.values.ending}
                  />
                </FormControl>
              )}
            </Field>
            <Button
              isLoading={formProps.isSubmitting}
              type="submit"
              colorVariant="primary"
            >
              Crear
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
