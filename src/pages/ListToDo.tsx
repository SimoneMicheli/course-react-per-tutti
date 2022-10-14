import React, { useCallback, useEffect, useMemo, useRef } from "react"
import "./ListToDo.css"
import AddToDo from "../components/AddToDo"
import ToDoList from "../components/ToDoList"
import * as Models from "../models"
import FilterMenu from "../components/FilterMenu"
import PieChart from "../components/PieChart"
import ErrorWrapper from "../components/ErrorWrapper"
import { useAppDispatch, useAppSelector } from "../store/store"
import {
  getToDoListAction,
  filter as filterAction,
  addToDoAction,
  deleteToDoAction,
  toggleCompleteAction,
  deleteCompletedToDoAction,
} from "../store/listSlice"
import { filterCompleted, filterNotCompleted } from "../models"

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

function ListToDo() {
  const dispatch = useAppDispatch()
  const toDos = useAppSelector((state) => state.list.todos)
  const error = useAppSelector((state) => state.list.error)
  const filter = useAppSelector((state) => state.list.filter)
  const abortController = useRef<ReturnType<ReturnType<typeof getToDoListAction>>>()

  const onAdd = (title: string) => {
    dispatch(addToDoAction({ title, completed: false, created_at: new Date() }))
  }

  const onToDoClick = async (itemIndex: number) => {
    if (!toDos) return

    dispatch(toggleCompleteAction(toDos[itemIndex]))
  }

  const onDelete = async (index: number) => {
    const todo = toDos?.[index]
    if (todo) dispatch(deleteToDoAction(todo))
  }

  const onCleanup = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      dispatch(deleteCompletedToDoAction())
    },
    [dispatch]
  )

  const onFilterChange = useCallback(
    (filter: Models.Filter) => {
      dispatch(filterAction(filter))
    },
    [dispatch]
  )

  const completedList = useMemo(() => (toDos ? filterToDos(toDos, "COMPLETED") : []), [toDos])
  const filteredList = useMemo(() => (toDos ? filterToDos(toDos, filter) : []), [toDos, filter])

  /**
   * This function must use the useCallback hooks to return the same reference at every render
   * oterwise, the below useEffect will be called at every render because the loadToDo reference change
   */
  const loadToDo = useCallback(() => {
    abortController.current?.abort()
    abortController.current = dispatch(getToDoListAction())
  }, [abortController, dispatch])

  useEffect(() => {
    abortController.current = dispatch(getToDoListAction())
    return () => {
      abortController.current?.abort()
    }
  }, [dispatch])

  return (
    <ErrorWrapper
      error={error}
      action={
        <button className="btn btn-primary" onClick={loadToDo}>
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
              <FilterMenu filter={filter} onCleanup={onCleanup} onFilterChange={onFilterChange} onReload={loadToDo} />
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
          <ToDoList items={filteredList} onClick={onToDoClick} onDelete={onDelete} isLoading={!toDos && !error} />
        </div>
      </section>

      <section className="row justify-content-center" style={{ display: !toDos || toDos.length === 0 ? "none" : "" }}>
        <div className="col-12 col-md-3">
          <PieChart completed={completedList.length} notCompleted={(toDos?.length ?? 0) - completedList.length} />
        </div>
      </section>
    </ErrorWrapper>
  )
}

export default ListToDo
