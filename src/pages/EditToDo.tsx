import React from "react"
import { Link, LoaderFunctionArgs, useLoaderData, useRouteError, defer, Await } from "react-router-dom"
import { getToDo } from "../api"
import { ToDo } from "../models"

export async function editLoader({ params }: LoaderFunctionArgs) {
  if (!params.id) return Promise.reject(new Error("Invalid id"))
  return defer({
    todo: getToDo(params.id),
  })
}

export function EditToDoError() {
  const error = useRouteError() as string
  return (
    <section className="row justify-content-center my-4">
      <div className="col-6 text-center">
        <p>Si è verificato un errore</p>
        <p>
          <small>{error}</small>
        </p>
        <Link to="/">Torna alla lista</Link>
      </div>
    </section>
  )
}

function Loader() {
  return (
    <section className="row justify-content-center">
      <form className="col-12 col-md-6">
        <div>
          <label className="form-label">Titolo</label>
          <span className="placeholder-glow">
            <div className="placeholder  col-12 placeholder-lg" />
          </span>
        </div>
        <div>
          <label className="form-label mt-2">Descrizione</label>
          <span className="placeholder-glow">
            <div className="placeholder  col-12 placeholder-lg" />
          </span>
        </div>
      </form>
    </section>
  )
}

function EditToDo({ todo }: { todo: ToDo }) {
  return (
    <section className="row justify-content-center">
      <form className="col-12 col-md-6">
        <div>
          <label className="form-label">Titolo</label>
          <input type="text" className="form-control" value={todo.title} />
        </div>
        <div>
          <label className="form-label mt-2">Descrizione</label>
          <textarea className="form-control" value={todo.description} />
        </div>
        <div className="d-flex justify-content-end mt-4">
          <Link to="/" className="btn btn-link">
            Torna alla lista
          </Link>
          <button className="btn btn-primary">Aggiorna</button>
        </div>
      </form>
    </section>
  )
}

export default function EditToDoPage() {
  const data = useLoaderData() as { todo: ToDo }

  return (
    <div className="mb-2">
      <section className="row justify-content-center">
        <div className="col-12 col-md-6">
          <h5>Modifica</h5>
          <hr className="border border-2 border-dark" />
        </div>
      </section>
      <React.Suspense fallback={<Loader />}>
        <Await resolve={data.todo} errorElement={<EditToDoError />}>
          {(todo: ToDo) => <EditToDo todo={todo} />}
        </Await>
      </React.Suspense>
    </div>
  )
}
