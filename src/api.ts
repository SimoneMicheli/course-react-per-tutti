import axios from "axios"
import { ToDo } from "./models"
import { parseJSON } from "date-fns"

async function waitMinimum<T>(fn: Promise<T> | (() => Promise<T>), time: number) {
  const rx = await Promise.all([
    new Promise((resolve) => setTimeout(resolve, time)),
    typeof fn === "function" ? fn() : fn,
  ])
  return rx[1]
}

export function getToDoList() {
  return waitMinimum(
    axios
      .get<Array<ToDo>>("http://localhost:5000/api/todo/")
      .then((resp) => {
        return resp.data.map((todo) => ({ ...todo, created_at: parseJSON(todo.created_at) }))
      })
      .catch((e) => {
        return Promise.reject(e.message)
      }),
    1000
  )
}
