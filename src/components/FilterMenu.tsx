import React, { MouseEvent } from "react"
import cn from "classnames"
import { Filter } from "../models"

interface FilterMenuProps {
  filter: Filter
  onFilterChange: (filter: Filter) => void
  onCleanup: (e: MouseEvent<HTMLButtonElement>) => void
}

export default function FilterMenu(props: FilterMenuProps) {
  const { filter, onCleanup, onFilterChange } = props
  return (
    <>
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
    </>
  )
}
