import React, { useState } from "react"
import "./App.css"
import cn from "classnames"
import AddToDo from "./components/AddToDo"
import ToDoList from "./components/ToDoList"
import * as Models from "./models"

const InitialToDos: Array<Models.ToDo> = [
  { title: "To do 1", completed: false, created_at: new Date() },
  { title: "To do 2", completed: true, created_at: new Date() },
]

function cleanupCompleted(todoList: Array<Models.ToDo>) {
  return todoList.filter((todo) => todo.completed === false)
}

function filterToDos(todoList: Array<Models.ToDo>, filter: Models.Filter) {
  switch (filter) {
    case "COMPLETED":
      return todoList.filter((todo) => todo.completed === true)
    case "NOT_COMPLETED":
      return todoList.filter((todoList) => todoList.completed === false)
    case "ALL":
    default:
      return todoList
  }
}

function App() {
  const [toDos, setToDos] = useState<Array<Models.ToDo>>(InitialToDos)
  const [filter, setFilter] = useState<Models.Filter>("ALL")

  const onAdd = (title: string) => {
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

  const onFilterChange = (filter: Models.Filter) => {
    setFilter(filter)
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-primary sticky-top">
        <div className="container">
          <span className="navbar-text">React per tutti (o quasi)</span>
        </div>
      </nav>

      <div className="container">
        <section className="row justify-content-center ">
          <div className="col-12 col-lg-6 text-center">
            <h1 className="page-title">
              <span>React per tutti (o quasi)</span>
            </h1>
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
                  <button
                    className={cn("btn btn-sm", {
                      "btn-primary": filter === "ALL",
                      "btn-outline-primary": filter !== "ALL",
                    })}
                    onClick={() => {
                      onFilterChange("ALL")
                    }}
                  >
                    Tutti
                  </button>
                  <button
                    className={cn("btn btn-sm", {
                      "btn-primary": filter === "COMPLETED",
                      "btn-outline-primary": filter !== "COMPLETED",
                    })}
                    onClick={() => {
                      onFilterChange("COMPLETED")
                    }}
                  >
                    Completati
                  </button>
                  <button
                    className={cn("btn btn-sm", {
                      "btn-primary": filter === "NOT_COMPLETED",
                      "btn-outline-primary": filter !== "NOT_COMPLETED",
                    })}
                    onClick={() => {
                      onFilterChange("NOT_COMPLETED")
                    }}
                  >
                    Non completati
                  </button>
                </div>
                <div className="btn-group ms-1">
                  <button className="btn btn-sm btn-outline-secondary" onClick={onCleanup}>
                    Rimuovi completati
                  </button>
                </div>
              </div>
              <div className="col-12 col-lg-3 d-lg-flex justify-content-end align-items-center mt-2 mt-lg-0">
                <span>
                  Completati {toDos.filter((todo) => todo.completed === true).length} di {toDos.length}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="row justify-content-center">
          <div className="col-12 col-md-8">
            <hr />
            <ToDoList items={filterToDos(toDos, filter)} onClick={onToDoClick} onDelete={onDelete} />
          </div>
        </section>
      </div>
    </>
  )
}

export default App
