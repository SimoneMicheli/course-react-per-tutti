import React, { useReducer, useState } from "react"
import "./App.css"
import AddToDo from "./components/AddToDo"
import ToDoList from "./components/ToDoList"
import { ToDoType } from "./models/todo"

const InitialToDos: Array<ToDoType> = [
  { title: "To do 1", completed: false, created_at: new Date() },
  { title: "To do 2", completed: true, created_at: new Date() },
]

function cleanupCompleted(todoList: Array<ToDoType>) {
  return todoList.filter((todo) => todo.completed === false)
}

function App() {
  const [toDos, setToDos] = useState<Array<ToDoType>>(InitialToDos)

  function onAdd(title: string) {
    setToDos((prevToDos) => [...prevToDos, { title, completed: false, created_at: new Date() }])
  }

  const onToDoClick = (index: number) => {
    setToDos((prevToDos) => {
      return [
        ...prevToDos.slice(0, index),
        { ...prevToDos[index], completed: !prevToDos[index].completed },
        ...prevToDos.slice(index + 1),
      ]
    })
  }

  const onDelete = (index: number) => {
    setToDos((prevToDos) => [...prevToDos.slice(0, index), ...prevToDos.slice(index + 1)])
  }

  const onCleanup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setToDos((prevToDos) => cleanupCompleted(prevToDos))
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-primary sticky-top">
        <div className="container">
          <span className="navbar-text">React per tutti (o quasi)</span>
          <div className="position-relative">
            <i className="bi bi-bell-fill fs-4"></i>
            <span className="badge rounded-pill bg-danger position-absolute top-0 end-20">1</span>
          </div>
        </div>
      </nav>

      <div className="container">
        <section className="row justify-content-center page-title">
          <div className="col-12 col-lg-6 text-center">
            <h1>React per tutti (o quasi)</h1>
          </div>
        </section>

        <section className="row justify-content-center">
          <div className="col-12 col-md-8 ">
            <AddToDo onAdd={onAdd} />
          </div>
        </section>

        <section className="row justify-content-center mt-4">
          <div className="col-12 col-md-8">
            <div className="row">
              <div className="col-12 col-lg-9 btn-toolbar">
                <div className="btn-group">
                  <button className="btn btn-sm btn-primary">Tutti</button>
                  <button className="btn btn-sm btn-outline-primary">Completati</button>
                  <button className="btn btn-sm btn-outline-primary">Non completati</button>
                </div>
                <div className="btn-group ms-1">
                  <button className="btn btn-sm btn-outline-secondary" onClick={onCleanup}>
                    Rimuovi completati
                  </button>
                </div>
              </div>
              <div className="col-12 col-lg-3 d-lg-flex justify-content-end align-items-center mt-2 mt-lg-0">
                <span>Completati 2 di 4</span>
              </div>
            </div>
          </div>
        </section>

        <section className="row justify-content-center">
          <div className="col-12 col-md-8">
            <hr />
            <ToDoList items={toDos} onClick={onToDoClick} onDelete={onDelete} />
          </div>
        </section>
      </div>
    </>
  )
}

export default App
