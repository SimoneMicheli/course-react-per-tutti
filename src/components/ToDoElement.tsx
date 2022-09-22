import React from "react"
import { ToDo } from "../models"
import cn from "classnames"
import { formatDistance } from "date-fns"
import { it } from "date-fns/locale"

interface ToDoElementProps {
  index: number
  todo: ToDo
  onClick: (index: number) => void
  onDelete: (index: number) => void
}

export default function ToDoElement({ index, todo, onClick, onDelete }: ToDoElementProps) {
  const now = new Date()
  return (
    <li
      className={cn("list-group-item d-flex justify-content-between align-items-center", {
        completed: todo.completed,
      })}
    >
      <div className="d-flex flex-column">
        <div>
          <input
            type="checkbox"
            className="form-check-input me-1"
            checked={todo.completed}
            onChange={() => {
              onClick(index)
            }}
          />
          <label className="form-check-label">{todo.title}</label>
        </div>
        <div>
          <span className="caption">
            Creato {formatDistance(todo.created_at, now, { addSuffix: true, locale: it })}
          </span>
          {todo.completed && todo.completed_at ? (
            <span className="caption ms-1">
              - Completato {formatDistance(todo.completed_at, now, { addSuffix: true, locale: it })}
            </span>
          ) : null}
        </div>
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
  )
}
