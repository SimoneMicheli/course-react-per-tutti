import axios from "axios"
import { ToDo } from "./models"

function delay<T>(fn: Promise<T> | (() => Promise<T>), time: number) {
  return Promise.all([new Promise((resolve) => setTimeout(resolve, time)), typeof fn === "function" ? fn() : fn]).then(
    (rx) => rx[1]
  )
}

export function getToDoList() {
  /* return Promise.all([
    new Promise((resolve) => setTimeout(resolve, 5000)),
    axios
      .get<Array<ToDo>>("http://localhost:5000/api/todolist")
      .then((resp) => {
        return resp.data
      })
      .catch((e) => {
        console.error(e)
      }),
  ]).then((response) => response[1]) */

  return delay(
    axios
      .get<Array<ToDo>>("http://localhost:5000/api/todolist")
      .then((resp) => {
        return resp.data
      })
      .catch((e) => {
        return Promise.reject(e.message)
      }),
    1000
  )
}
