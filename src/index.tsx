import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import router from "./pages/router"
import { Provider } from "react-redux"
import { RouterProvider } from "react-router-dom"
import { store } from "./store/store"
import * as sse from "./sse"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" closeOnClick pauseOnFocusLoss={false} />
    </Provider>
  </React.StrictMode>
)

sse.registerAllEvents()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
