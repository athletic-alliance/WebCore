import React from "react";
import * as Yup from "yup";
import { ExerciseType } from "../../../../../enums/exercise-type.enum";
import { Field, Form, Formik } from "formik";
import { CreateExerciseDto } from "../../../../../dtos/exercises/create-exercise.dto";

const NewExerciseSchema = Yup.object().shape({
  name: Yup.string().required("Name wird benötigt"), // @ts-ignore
  exerciseType: Yup.mixed<ExerciseType>().oneOf(Object.values(ExerciseType)),
});

type AddExerciseFormProps = {
  formSubmitted: (values: CreateExerciseDto) => void;
};

export const AddExerciseForm = ({ formSubmitted }: AddExerciseFormProps) => {
  return (
    <Formik
      initialValues={{
        name: "",
        exerciseType: ExerciseType.Bodyweight,
      }}
      validationSchema={NewExerciseSchema}
      onSubmit={(values: any) => {
        formSubmitted(values);
      }}
    >
      {({ errors, touched, isValid, dirty }) => (
        <div className="w-full">
          <Form className={"w-full"}>
            <div className={"w-full"}>
              <label
                htmlFor="name"
                className="mb-1 block font-medium text-gray-700 text-sm"
              >
                Name
              </label>
              <Field
                className="w-full rounded rounded-md border border-gray-300"
                id="name"
                name="name"
                type="name"
              />
            </div>
            <div>
              <label
                htmlFor="exerciseType"
                className="mb-1 mt-3 block font-medium text-gray-700 text-sm"
              >
                Typ
              </label>
              <Field
                name="exerciseType"
                as="select"
                className="rounded rounded-md border border-gray-300"
              >
                {Object.keys(ExerciseType)
                  .filter((key: any) => !isNaN(Number(ExerciseType[key])))
                  .map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
              </Field>
            </div>
            <button
              type="submit"
              className="mt-3 w-full items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-center font-medium text-white shadow-sm text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Speichern
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};
