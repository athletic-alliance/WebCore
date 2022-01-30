import React from 'react'
import * as Yup from 'yup';
import {ExerciseType} from '../../../../../enums/exercise-type.enum';
import {Field, Form, Formik} from 'formik';
import {CreateExerciseDto} from '../../../../../dtos/exercises/create-exercise.dto';

const NewExerciseSchema = Yup.object().shape({
    name: Yup.string().required('Name wird benötigt'),// @ts-ignore
    exerciseType: Yup.mixed<ExerciseType>().oneOf(Object.values(ExerciseType))
});

type AddExerciseFormProps = {
    formSubmitted: (values: CreateExerciseDto) => void;
}

export const AddExerciseForm = ({formSubmitted}: AddExerciseFormProps) => {
    return (
        <Formik
            initialValues={{
                name: '',
                exerciseType: ExerciseType.Bodyweight,
            }}
            validationSchema={NewExerciseSchema}
            onSubmit={(values: any) => {
                formSubmitted(values);
            }}
        >
            {({errors, touched, isValid, dirty}) => (
                <>
                    <Form>
                        <div>
                            <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <Field
                                id="name"
                                name="name"
                                type="name"
                            />
                        </div>
                        <div>
                            <label htmlFor="exerciseType" className="mb-1 mt-3 block text-sm font-medium text-gray-700">
                                Typ
                            </label>
                            <Field name="exerciseType" as="select">
                                {Object.keys(ExerciseType).filter((key: any) => !isNaN(Number(ExerciseType[key]))).map((key) => (
                                    <option key={key} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </Field>
                        </div>
                        <button
                            type="submit"
                            className="items-center mt-3 w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Speichern
                        </button>
                    </Form>
                </>
            )}
        </Formik>)
}
