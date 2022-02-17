import React from "react";

import * as Yup from "yup";
import clsx from "clsx";
import { Field, Form, Formik, FormikValues } from "formik";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Bitte gib deine E-Mail Adresse ein"),
  password: Yup.string().required("Bitte gib ein Passwort ein"),
});

type LoginFormProps = {
  formSubmitted: (credentials: FormikValues) => void;
};

export const LoginForm: React.FC<LoginFormProps> = ({
  formSubmitted,
}: LoginFormProps) => {
  const getStyle = (error: any, touched: boolean | undefined) => {
    return clsx({
      "px-2 py-1 border focus:outline-none focus:border-gray-400 rounded-sm w-full text-sm":
        true,
      "border-red-400": error,
    });
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={(values: FormikValues) => {
        formSubmitted(values);
      }}
    >
      {({ errors, touched, isValid, dirty }) => (
        <>
          <Form>
            <div>
              <label
                htmlFor="email"
                className="mb-1 block font-medium text-gray-700 text-sm"
              >
                E-Mail
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                className={getStyle(errors.email, touched.email)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1 mt-3 block font-medium text-gray-700 text-sm"
              >
                Passwort
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                className={getStyle(errors.password, touched.password)}
              />
            </div>
            <button
              type="submit"
              className="mt-3 w-full items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-center font-medium text-white shadow-sm text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Anmelden
            </button>
          </Form>
        </>
      )}
    </Formik>
  );
};
