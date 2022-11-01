/* eslint-disable prefer-promise-reject-errors */
import axios from "axios"
import { parseToDo, ToDo } from "./models"

const MIN_DELAY = 1000

async function waitMinimum<T>(fn: Promise<T> | (() => Promise<T>), time: number): Promise<T> {
  return Promise.all([new Promise((resolve) => setTimeout(resolve, time)), typeof fn === "function" ? fn() : fn]).then(
    (rx) => rx[1]
  )
}

function rejectError(e: Error) {
  return Promise.reject(e.message)
}

const client = axios.create({
  baseURL: "http://localhost:5000/api/todo/",
  timeout: 5000,
})

export function getToDoList(signal?: AbortSignal) {
  return waitMinimum(
    client
      .get<Array<ToDo>>("/", { signal })
      .then((resp) => {
        return resp.data.map((todo) => parseToDo(todo))
      })
      .catch(rejectError),
    MIN_DELAY
  )
}

export function createToDo(todo: ToDo) {
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

export function getToDo(id: string) {
  return waitMinimum(
    client
      .get(`/${id}`)
      .then((resp) => parseToDo(resp.data))
      .catch(rejectError),
    MIN_DELAY
  )
}
