type ToDoModel = {
  title: string
  completed: boolean
  created_at: Date
  completed_at?: Date
  description?: string
  id: string
}

type NewToDo = Omit<ToDoModel, "id">

type ToDo = ToDoModel & {
  requestId?: string
}

type Filter = "ALL" | "COMPLETED" | "NOT_COMPLETED"

export function filterCompleted(todoList: Array<ToDo>) {
  return todoList.filter((todo) => todo.completed === true)
}

export function filterNotCompleted(todoList: Array<ToDo>) {
  return todoList.filter((todo) => todo.completed === false)
}

export type { ToDo, Filter, NewToDo }
