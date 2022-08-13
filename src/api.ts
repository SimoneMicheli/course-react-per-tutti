import axios from "axios"
import { ToDo } from "./models"

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
        return resp.data
      })
      .catch((e) => {
        return Promise.reject(e.message)
      }),
    1000
  )
}
