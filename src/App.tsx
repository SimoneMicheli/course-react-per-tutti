import React, { useCallback, useEffect, useMemo, useState } from "react"
import "./App.css"
import AddToDo from "./components/AddToDo"
import ToDoList from "./components/ToDoList"
import * as Models from "./models"
import FilterMenu from "./components/FilterMenu"
import PieChart from "./components/PieChart"
import { createToDo, deleteMultipleToDo, deleteToDo, getToDoList, updateToDo } from "./api"
import ErrorWrapper from "./components/ErrorWrapper"

function filterCompleted(todoList: Array<Models.ToDo>) {
  return todoList.filter((todo) => todo.completed === true)
}

function filterNotCompleted(todoList: Array<Models.ToDo>) {
  return todoList.filter((todo) => todo.completed === false)
}

function filterToDos(todoList: Array<Models.ToDo>, filter: Models.Filter) {
  switch (filter) {
    case "COMPLETED":
      return filterCompleted(todoList)
    case "NOT_COMPLETED":
      return filterNotCompleted(todoList)
    case "ALL":
    default:
      return todoList
  }
}

function App() {
  const [toDos, setToDos] = useState<Array<Models.ToDo> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<Models.Filter>("ALL")
  const [updatingItemsIndex, setUpdatingItemsIndex] = useState<number[]>([])

  const onAdd = (title: string) => {
    const prevToDos = toDos
    setToDos(null)
    setError(null)
    createToDo({ title, completed: false, created_at: new Date() })
      .then((todo) => setToDos(prevToDos ? [...prevToDos, todo] : null))
      .catch((e) => setError(e))
  }

  const onToDoClick = async (itemIndex: number) => {
    if (!toDos) return

    try {
      // make a copy of the updated todo
      const requiredUpdate = { ...toDos[itemIndex], completed: !toDos[itemIndex].completed }
      requiredUpdate.completed_at = requiredUpdate.completed ? new Date() : undefined
      // add the position of the currently updating item to the array
      setUpdatingItemsIndex((oldArray) => [...oldArray, itemIndex])
      // send the updated item to the server and get the response
      const updated = await updateToDo(requiredUpdate)
      // update the list of to do with the updated status
      setToDos((oldToDo) => {
        // todos cant be used here because we need the last update, otherwise the risk is that the todo list
        // has been updated while the request was in progress to the server, in this case the list status
        // is overwritten with an old state (when the request was initiated)
        if (!oldToDo) return oldToDo
        return [...oldToDo.slice(0, itemIndex), updated, ...oldToDo.slice(itemIndex + 1)]
      })
    } catch (e) {
      setError(e as string)
    } finally {
      // remove the position of the current item from the updating index
      setUpdatingItemsIndex((oldArray) => {
        // search te position of the current item index in the updating item array
        const index = oldArray.findIndex((item) => item === itemIndex)
        return [...oldArray.slice(0, index), ...oldArray.slice(index + 1, oldArray.length)]
      })
    }
  }

  const onDelete = async (index: number) => {
    try {
      const prevToDos = toDos
      setToDos(prevToDos ? [...prevToDos.slice(0, index), ...prevToDos.slice(index + 1)] : null)
      await deleteToDo(toDos?.[index])
    } catch (e) {
      setError(e as string)
    }
  }

  const onCleanup = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      if (!toDos) return
      const prevToDos = toDos
      setToDos(null)
      try {
        await deleteMultipleToDo(filterCompleted(prevToDos))
        setToDos(filterNotCompleted(prevToDos))
      } catch (e) {
        setError(e as string)
      }
    },
    [toDos]
  )

  const onFilterChange = useCallback((filter: Models.Filter) => {
    setFilter(filter)
  }, [])

  const completedList = useMemo(() => (toDos ? filterToDos(toDos, "COMPLETED") : []), [toDos])
  const filteredList = useMemo(() => (toDos ? filterToDos(toDos, filter) : []), [toDos, filter])

  /**
   * This function must use the useCallback hooks to return the same reference at every render
   * oterwise, the below useEffect will be called at every render because the loadToDo reference change
   */
  const loadToDo = useCallback(() => {
    setToDos(null)
    setError(null)
    getToDoList()
      .then((data) => {
        setToDos(data)
      })
      .catch((e) => {
        setError(e)
      })
  }, [])

  useEffect(() => {
    loadToDo()
  }, [loadToDo])

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

        <ErrorWrapper
          error={error}
          action={
            <button className="btn btn-primary" onClick={() => loadToDo()}>
              Aggiorna
            </button>
          }
        >
          <section className="row justify-content-center">
            <div className="col-12 col-md-8 ">
              <AddToDo onAdd={onAdd} disabled={!toDos && !error} />
            </div>
          </section>

          <section className="row justify-content-center mt-4">
            <div className="col-12 col-md-8">
              <div className="row">
                <div className="col-12 col-lg-9 btn-toolbar">
                  {/** it's important to wrap onCleanup and onFilterChange in useCallback hook, otherwise the reference
                   * to those two variable will continue to change over render and React.memo will continue to re-render the FilterMenu
                   */}
                  <FilterMenu
                    filter={filter}
                    onCleanup={onCleanup}
                    onFilterChange={onFilterChange}
                    onReload={loadToDo}
                  />
                </div>
                <div className="col-12 col-lg-3 d-lg-flex justify-content-end align-items-center mt-2 mt-lg-0">
                  <span>
                    Completati {completedList.length} di {toDos?.length ?? 0}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="row justify-content-center mb-4">
            <div className="col-12 col-md-8">
              <hr />
              <ToDoList
                items={filteredList}
                onClick={onToDoClick}
                onDelete={onDelete}
                isLoading={!toDos && !error}
                updatingItemsIndex={updatingItemsIndex}
              />
            </div>
          </section>

          <section
            className="row justify-content-center"
            style={{ display: !toDos || toDos.length === 0 ? "none" : "" }}
          >
            <div className="col-12 col-md-3">
              <PieChart completed={completedList.length} notCompleted={(toDos?.length ?? 0) - completedList.length} />
            </div>
          </section>
        </ErrorWrapper>
      </div>
    </>
  )
}

export default App
