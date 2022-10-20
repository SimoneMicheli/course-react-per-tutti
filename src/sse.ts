import { dispatch } from "./store/store"
import { addRemoteEvent, deleteRemoteEvent, updateRemoteEvent } from "./store/listSlice"
import { parseToDo, RemoteEvents } from "./models"
import { toast } from "react-toastify"

export type ToDoEventSource = EventSource & {
  addEvent: (event: RemoteEvents, callback: (event: Event) => void) => void
}

export default function initSSE(url: string): EventSource {
  const eventSource = new EventSource(url)

  eventSource.onopen = (event) => {
    console.debug("SSE initiated correctly", event)
  }

  eventSource.onerror = (event) => {
    console.error("An SSE error is occurred", event)
  }

  return eventSource
}

const sse = initSSE("http://localhost:5000/api/todo/events")

export function registerEvent(event: RemoteEvents, callback: (this: EventSource, event: MessageEvent) => void) {
  sse.addEventListener(event, callback)
}

export function registerAllEvents() {
  registerEvent("ADD", (event) => {
    const todo = parseToDo(JSON.parse(event.data))
    toast.success(`Aggiunto ${todo.title}`)
    dispatch(addRemoteEvent(todo))
  })
  registerEvent("UPDATE", (event) => {
    const todo = parseToDo(JSON.parse(event.data))
    toast.success(`Aggiornato ${todo.title}`)
    dispatch(updateRemoteEvent(todo))
  })
  registerEvent("DELETE", (event) => {
    const todo = parseToDo(JSON.parse(event.data))
    toast.success(`Eliminato ${todo.title}`)
    dispatch(deleteRemoteEvent(todo))
  })
}
