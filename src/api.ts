/* eslint-disable prefer-promise-reject-errors */
import axios from "axios"
import { ToDo } from "./models"
import { parseJSON } from "date-fns"

const MIN_DELAY = 1000

async function waitMinimum<T>(fn: Promise<T> | (() => Promise<T>), time: number) {
  const rx = await Promise.all([
    new Promise((resolve) => setTimeout(resolve, time)),
    typeof fn === "function" ? fn() : fn,
  ])
  return rx[1]
}

function rejectError(e: Error) {
  return Promise.reject(e.message)
}

function parseToDo(todo: ToDo) {
  return { ...todo, created_at: parseJSON(todo.created_at) }
}

const client = axios.create({
  baseURL: "http://localhost:5000/api/todo/",
  timeout: 5000,
})

export function getToDoList() {
  return waitMinimum(
    client
      .get<Array<ToDo>>("/")
      .then((resp) => {
        return resp.data.map((todo) => parseToDo(todo))
      })
      .catch(rejectError),
    MIN_DELAY
  )
}

export function createToDo(todo: Omit<ToDo, "id">) {
  return waitMinimum(
    client
      .post("/", todo)
      .then((resp) => parseToDo(resp.data))
      .catch(rejectError),
    MIN_DELAY
  )
}

export function deleteToDo(todo: ToDo | undefined) {
  if (!todo) return Promise.reject("Invalid to do")
  return waitMinimum(client.delete(`/${todo.id}`).catch(rejectError), MIN_DELAY)
}

export function deleteMultipleToDo(todos: Array<ToDo>) {
  return waitMinimum(Promise.all(todos.map((todo) => deleteToDo(todo))), MIN_DELAY)
}

export function updateToDo(todo: ToDo | undefined) {
  if (!todo) return Promise.reject("Invalid to do")
  return waitMinimum(
    client
      .put(`/${todo.id}`, todo)
      .then((resp) => parseToDo(resp.data))
      .catch(rejectError),
    MIN_DELAY
  )
}
