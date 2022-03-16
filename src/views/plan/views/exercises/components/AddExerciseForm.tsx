import React from 'react'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'
import { ExerciseType } from '../../../../../enums/exercise-type.enum'
import { CreateExerciseDto } from '../../../../../dtos/exercises/create-exercise.dto'

const NewExerciseSchema = Yup.object().shape({
    name: Yup.string().required('Name wird benötigt'),
    // @ts-ignore
    exerciseType: Yup.mixed<ExerciseType>().oneOf(Object.values(ExerciseType)),
})

type AddExerciseFormProps = {
    formSubmitted: (values: CreateExerciseDto) => void
}

export const AddExerciseForm = ({
    formSubmitted,
}: AddExerciseFormProps): JSX.Element => {
    return (
        <Formik
            initialValues={{
                name: '',
                exerciseType: ExerciseType.Bodyweight,
            }}
            validationSchema={NewExerciseSchema}
            onSubmit={(values: any) => {
                formSubmitted(values)
            }}
        >
            {({ errors, touched, isValid, dirty }) => (
                <div className="w-full">
                    <Form className="w-full">
                        <div className="w-full">
                            <label
                                htmlFor="name"
                                className="block font-medium text-gray-700 text-sm"
                            >
                                Name
                            </label>
                            <Field
                                input
                                className="block w-full rounded-sm border-slate-300 focus:border-slate-500 focus:ring-0 sm:text-sm"
                                id="name"
                                name="name"
                                type="text"
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
                                className="block w-full rounded-sm border-slate-300 focus:border-slate-500 focus:ring-0 sm:text-sm"
                            >
                                {Object.keys(ExerciseType)
                                    .filter(
                                        (key: any) =>
                                            !isNaN(Number(ExerciseType[key]))
                                    )
                                    .map((key) => (
                                        <option key={key} value={key}>
                                            {key}
                                        </option>
                                    ))}
                            </Field>
                        </div>
                        <div className="py-3">
                            <button
                                type="submit"
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 font-medium text-white shadow-sm text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Speichern
                            </button>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    )
}
