import React from "react"
import { Link, LoaderFunctionArgs, useLoaderData, useRouteError } from "react-router-dom"
import { getToDo } from "../api"
import { ToDo } from "../models"

export async function editLoader({ params }: LoaderFunctionArgs) {
  if (!params.id) return Promise.reject(new Error("Invalid id"))
  return getToDo(params.id)
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

export default function EditToDo() {
  const data = useLoaderData() as ToDo
  return (
    <section className="row justify-content-center">
      <form className="col-12 col-md-6">
        <div>
          <label className="form-label">Titolo</label>
          <input type="text" className="form-control" value={data.title} />
        </div>
        <div>
          <label className="form-label">Descrizione</label>
          <textarea className="form-control" value={data.description} />
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
