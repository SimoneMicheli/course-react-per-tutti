import React, { useRef } from "react"
import { ToDo } from "../models"
import cn from "classnames"

interface ToDoListProps {
  items: Array<ToDo>
  onClick: (item: number) => void
  onDelete: (item: number) => void
  isLoading: boolean
}

export default function ToDoList(props: ToDoListProps) {
  const { items, onClick, onDelete, isLoading } = props

  /**
   * Store number of items before loding from server
   */
  const prevItemLength = useRef<number>(items.length)

  /**
   * update the number of items if there is no loading in progress, otherwise keep in the state
   * the previous number of items.
   * This will result in a loading effect equal to the number of previous items
   */
  if (isLoading === false && prevItemLength.current !== items.length) {
    prevItemLength.current = items.length
  }

  if (isLoading)
    return (
      <ul className="list-group">
        {Array(...Array(prevItemLength.current !== 0 ? prevItemLength.current : 3)).map((_, i) => (
          <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
            <div className="flex-grow-1 placeholder-glow">
              <span className="placeholder placeholder-lg col-6" />
            </div>
            <div className="btn-group">
              <button className="btn btn-link opacity-0">
                <i className="trash"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    )

  if (items.length === 0 && !isLoading)
    return (
      <h3 className="text-center my-4">
        <p className="opacity-50">
          <small>Lista Vuota</small>
        </p>
      </h3>
    )

  return (
    <ul className="list-group">
      {items.map((item, index) => (
        <li
          key={index}
          className={cn("list-group-item d-flex justify-content-between align-items-center", {
            completed: item.completed,
          })}
        >
          <div>
            <input
              type="checkbox"
              className="form-check-input me-1"
              checked={item.completed}
              onChange={() => {
                onClick(index)
              }}
            />
            <label className="form-check-label">{item.title}</label>
          </div>
          <div className="btn-group">
            <button className="btn btn-link text-black-50">
              <i className="edit"></i>
            </button>
            <button
              className="btn btn-link text-black-50"
              onClick={(e) => {
                e.preventDefault()
                onDelete(index)
              }}
            >
              <i className="trash"></i>
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
