import React, { PropsWithChildren } from "react"

interface ErrorWrapperProps {
  error: string | null
  action?: JSX.Element
}

export default function ErrorWrapper({ error, children, action }: PropsWithChildren<ErrorWrapperProps>) {
  if (!error) return <>{children}</>

  return (
    <section className="row justify-content-center my-4">
      <div className="col-6 text-center">
        <p>Si è verificato un errore, prova più tardi</p>
        <p>
          <small>{error}</small>
        </p>
        {action}
      </div>
    </section>
  )
}
