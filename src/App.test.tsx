import React from "react"
import { render, screen } from "@testing-library/react"
import ListToDo from "./pages/ListToDo"

test("renders learn react link", () => {
  render(<ListToDo />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
