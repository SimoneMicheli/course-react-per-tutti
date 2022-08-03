import React from "react"
import { ToDoType } from "../models/todo"
import cn from "classnames"

interface ToDoListProps {
  items: Array<ToDoType>
  onClick: (item: number) => void
  onDelete: (item: number) => void
}

export default function ToDoList(props: ToDoListProps) {
  const { items, onClick, onDelete } = props

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
              onClick={() => {
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
