import React from 'react'
import * as Yup from 'yup'
import { nanoid } from 'nanoid'
import { Field, Form, Formik } from 'formik'
import { ExerciseType } from '../../../../../enums/exercise-type.enum'
import { CreateExerciseDto } from '../../../../../dtos/exercises/create-exercise.dto'

const NewExerciseSchema = Yup.object().shape({
    name: Yup.string().required('Name wird benötigt'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    exerciseType: Yup.mixed<ExerciseType>().oneOf(Object.values(ExerciseType)),
})

interface ExerciseTypeOption {
    value: ExerciseType
    label: string
}

const exerciseTypeOptions: ExerciseTypeOption[] = [
    { value: ExerciseType.Bodyweight, label: 'Bodyweight' },
    { value: ExerciseType.Cardio, label: 'Cardio' },
    { value: ExerciseType.Strength, label: 'Strength' },
    { value: ExerciseType.None, label: 'Keine' },
]
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
            onSubmit={(values: CreateExerciseDto) => {
                console.log('test')
                formSubmitted(values)
            }}
        >
            {({ errors, touched, isValid, dirty }) => (
                <div className="w-full">
                    <Form className="w-full">
                        <div className="w-full">
                            <label
                                htmlFor="name"
                                className="mb-2 block font-medium text-gray-700 text-sm"
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="focus:ring-none w-full rounded rounded-md border border-gray-300 px-3 py-2 text-slate-900 shadow-inner text-sm focus:outline-none"
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
                                className="w-full rounded rounded-md border border-gray-300 px-3 py-2 text-slate-900 shadow-inner text-sm focus:outline-blue-50 focus:ring-blue-100"
                            >
                                {exerciseTypeOptions.map(
                                    (
                                        exerciseTypeOption: ExerciseTypeOption
                                    ) => (
                                        <option
                                            key={nanoid()}
                                            value={exerciseTypeOption.value}
                                        >
                                            {exerciseTypeOption.label}
                                        </option>
                                    )
                                )}
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
