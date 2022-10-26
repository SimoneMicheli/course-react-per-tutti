import { ErrorMessage, Field, useField } from "formik"
import cn, { Argument } from "classnames"
import React from "react"

export default function CustomField({
  name,
  className,
  ...props
}: { name: string; className?: Argument } & Record<string, unknown>) {
  const [_, meta] = useField(name)
  return (
    <>
      <Field className={cn("form-control", className, { "is-invalid": meta.error })} name={name} {...props} />
      <div className="invalid-feedback">
        <ErrorMessage name={name} />
      </div>
    </>
  )
}
