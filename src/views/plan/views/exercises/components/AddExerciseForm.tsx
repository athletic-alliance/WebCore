import React from 'react';
import * as Yup from 'yup';
import {ExerciseType} from '../../../../../enums/exercise-type.enum';
import {Field, Form, Formik} from 'formik';
import {CreateExerciseDto} from '../../../../../dtos/exercises/create-exercise.dto';

const NewExerciseSchema = Yup.object().shape({
    name: Yup.string().required('Name wird benötigt'), // @ts-ignore
    exerciseType: Yup.mixed<ExerciseType>().oneOf(Object.values(ExerciseType)),
});

type AddExerciseFormProps = {
    formSubmitted: (values: CreateExerciseDto) => void;
};

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
                <div className="w-full">
                    <Form className={'w-full'}>
                        <div className={'w-full'}>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <Field
                                input
                                className="focus:ring-0 focus:border-slate-500 block w-full rounded-sm sm:text-sm border-slate-300"
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
                                className="focus:ring-0 focus:border-slate-500 block w-full rounded-sm sm:text-sm border-slate-300"
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
                        <div className="py-3">
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Speichern
                            </button>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    );
};
