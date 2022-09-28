import React from "react"
import { createBrowserRouter } from "react-router-dom"
import EditToDo, { editLoader, EditToDoError } from "./EditToDo"
import BaseLayout from "../components/BaseLayout"
import NotFound from "./NotFound"
import ListToDo from "./ListToDo"

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <ListToDo />,
      },
      {
        path: "/todo/:id",
        element: <EditToDo />,
        loader: editLoader,
        errorElement: <EditToDoError />,
      },
    ],
    errorElement: <NotFound />,
  },
])

export default router
