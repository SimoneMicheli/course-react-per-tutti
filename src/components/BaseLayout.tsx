import React from "react"
import { Outlet } from "react-router-dom"

function BaseLayout() {
  return (
    <>
      <nav className="navbar navbar-dark bg-primary sticky-top">
        <div className="container">
          <span className="navbar-text">React per tutti (o quasi)</span>
        </div>
      </nav>

      <div className="container">
        <section className="row justify-content-center ">
          <div className="col-12 col-lg-6 text-center">
            <h1 className="page-title">
              <span>React per tutti (o quasi)</span>
            </h1>
          </div>
        </section>

        <Outlet />
      </div>
    </>
  )
}

export default BaseLayout
