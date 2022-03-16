import React from 'react'

import * as Yup from 'yup'
import clsx from 'clsx'
import { Field, Form, Formik, FormikValues } from 'formik'

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Bitte gib deine E-Mail Adresse ein'),
    password: Yup.string().required('Bitte gib ein Passwort ein'),
})

type LoginFormProps = {
    formSubmitted: (credentials: FormikValues) => void
}

export const LoginForm: React.FC<LoginFormProps> = ({
    formSubmitted,
}: LoginFormProps) => {
    const getStyle = (): string => {
        return clsx({
            'px-3 py-2 border text-sm  border-slate-200 focus:outline-none focus:border-slate-600 focus:ring-0 rounded-sm w-full':
                true,
            // 'border-red-400': error,
        })
    }

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={(values: FormikValues) => {
                formSubmitted(values)
            }}
        >
            {({ errors, touched, isValid, dirty }) => (
                <div className="w-96">
                    <Form>
                        <div className="mb-2">
                            <Field
                                id="email"
                                name="email"
                                type="email"
                                placeholder="E-Mail"
                                className={getStyle()}
                            />
                        </div>
                        <div className="mb-5">
                            <Field
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Passwort"
                                className={getStyle()}
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-3 w-full items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-center font-medium text-white shadow-sm text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Anmelden
                        </button>
                    </Form>
                </div>
            )}
        </Formik>
    )
}
