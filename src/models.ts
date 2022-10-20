import { parseJSON } from "date-fns"
import { v4 as uuid } from "uuid"

type ToDoModel = {
  title: string
  completed: boolean
  created_at: Date
  completed_at?: Date
  description?: string
  id: string
}

// type NewToDo = Omit<ToDoModel, "id">

type ToDo = ToDoModel & {
  requestId?: string
}

type Filter = "ALL" | "COMPLETED" | "NOT_COMPLETED"

export type RemoteEvents = "ADD" | "DELETE" | "UPDATE"

export function filterCompleted(todoList: Array<ToDo>) {
  return todoList.filter((todo) => todo.completed === true)
}

export function filterNotCompleted(todoList: Array<ToDo>) {
  return todoList.filter((todo) => todo.completed === false)
}

export function createToDoFromTitle(title: string): ToDo {
  return { title, completed: false, created_at: new Date(), id: uuid() }
}

export function parseToDo(todo: ToDo) {
  return {
    ...todo,
    created_at: parseJSON(todo.created_at),
    completed_at: todo.completed_at ? parseJSON(todo.completed_at) : undefined,
  }
}

export type { ToDo, Filter }
