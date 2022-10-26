import { ErrorMessage, Field, Form, Formik } from "formik"
import React from "react"
import * as yup from "yup"
import cn from "classnames"

interface AddToDoProps {
  onAdd: (title: string) => void
  disabled: boolean
}

const schema = yup.object({
  title: yup.string().required(),
})

export default function AddToDo({ onAdd, disabled }: AddToDoProps) {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, formikBag) => {
        onAdd(values.title)
        formikBag.resetForm()
      }}
      initialValues={{ title: "" }}
    >
      {(formik) => (
        <Form>
          <fieldset disabled={disabled}>
            <div className={cn("input-group", { "is-invalid": formik.errors.title })}>
              <div className="form-floating">
                <Field
                  name="title"
                  placeholder="Inserisci il todo"
                  id="todo-input"
                  className={cn("form-control", { "is-invalid": formik.errors.title })}
                />
                <label htmlFor="todo-input">Inserisci il todo</label>
              </div>

              <button className="btn btn-primary" type="submit" disabled={!formik.isValid}>
                Aggiungi
              </button>
            </div>
            <div className="invalid-feedback">
              <ErrorMessage name="title" />
            </div>
          </fieldset>
        </Form>
      )}
    </Formik>
  )
}
