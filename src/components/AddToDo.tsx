import { useState } from "react"

interface AddToDoProps {
  onAdd: (title: string) => void
  disabled: boolean
}

export default function AddToDo({ onAdd, disabled }: AddToDoProps) {
  const [value, setValue] = useState("")

  return (
    <form>
      <fieldset disabled={disabled}>
        <div className="input-group">
          <div className="form-floating">
            <input
              type="text"
              id="todo-input"
              placeholder="Inserisci il todo"
              className="form-control"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <label htmlFor="todo-input">Inserisci il todo</label>
          </div>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault()
              onAdd(value)
              setValue("")
            }}
          >
            Aggiungi
          </button>
        </div>
      </fieldset>
    </form>
  )
}
