import { dispatch } from "./store/store"
import { addRemoteEvent, deleteRemoteEvent, updateRemoteEvent } from "./store/listSlice"
import { parseToDo, RemoteEvents } from "./models"

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
    dispatch(addRemoteEvent(parseToDo(JSON.parse(event.data))))
  })
  registerEvent("UPDATE", (event) => {
    dispatch(updateRemoteEvent(parseToDo(JSON.parse(event.data))))
  })
  registerEvent("DELETE", (event) => {
    dispatch(deleteRemoteEvent(parseToDo(JSON.parse(event.data))))
  })
}
