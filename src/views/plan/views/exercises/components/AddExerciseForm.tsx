import React from 'react'
import * as Yup from 'yup'
import { nanoid } from 'nanoid'
import { Field, Form, Formik } from 'formik'
import classNames from 'classnames'
import { DocumentDuplicateIcon } from '@heroicons/react/outline'
import { ExerciseType } from '../../../../../enums/exercise-type.enum'
import { CreateExerciseDto } from '../../../../../dtos/exercises/create-exercise.dto'

const NewExerciseSchema = Yup.object().shape({
    name: Yup.string().required('Bitte gib einen Namen ein'),
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
                formSubmitted(values)
            }}
        >
            {({ errors }) => (
                <div className="w-full">
                    <Form className="w-full">
                        <div className="w-full">
                            <label
                                htmlFor="name"
                                className="mb-2 block font-medium text-gray-700 text-sm"
                            >
                                Name
                            </label>
                            <Field
                                id="name"
                                name="name"
                                type="text"
                                className={classNames({
                                    'w-full rounded rounded-md border px-3 py-2 text-slate-900 text-sm focus:ring-blue-100':
                                        true,
                                    'border-red-700': errors.name,
                                    'border-gray-300': !errors.name,
                                })}
                            />
                            {errors.name && (
                                <div className="p-1 text-red-700 text-sm">
                                    {errors.name}
                                </div>
                            )}
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
                                className="w-full rounded rounded-md border border-gray-300 px-3 py-2 text-slate-900 text-sm focus:ring-blue-100"
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
                        <div className="mt-12">
                            <div className="flex font-light">
                                <div className="flex p-2 text-sm">
                                    <div>
                                        <DocumentDuplicateIcon className="h-6 w-6 text-blue-500" />
                                    </div>
                                    <div className="ml-2">
                                        Als Vorlage speichern
                                    </div>
                                </div>
                                <div className="ml-1 mr-1 w-0 border-l border-slate-400 p-2" />
                                <button
                                    type="submit"
                                    className="mr-2 cursor-pointer rounded rounded-md border border-blue-300 bg-blue-100 p-2 text-blue-600 text-sm"
                                >
                                    Speichern
                                </button>
                            </div>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    )
}
