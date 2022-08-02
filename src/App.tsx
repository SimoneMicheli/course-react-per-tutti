import React from "react"
import "./App.css"

function App() {
  return (
    <>
      <nav className="navbar navbar-dark bg-primary sticky-top">
        <div className="container">
          <span className="navbar-text">React per tutti (o quasi)</span>
          <div className="position-relative">
            <i className="bi bi-bell-fill fs-4"></i>
            <span className="badge rounded-pill bg-danger position-absolute top-0 end-20">1</span>
          </div>
        </div>
      </nav>

      <div className="container">
        <section className="row justify-content-center page-title">
          <div className="col-12 col-md-6 text-center">
            <h1>React per tutti (o quasi)</h1>
          </div>
        </section>

        <section className="row justify-content-center">
          <div className="col-12 col-md-6">
            <form>
              <div className="input-group">
                <div className="form-floating">
                  <input type="text" id="todo-input" placeholder="Inserisci il todo" className="form-control" />
                  <label htmlFor="todo-input">Inserisci il todo</label>
                </div>
                <button className="btn btn-primary">Aggiungi</button>
              </div>
            </form>
          </div>
        </section>

        <section className="row justify-content-center mt-4">
          <div className="col-12 col-md-6 d-flex justify-content-between align-items-center">
            <span>Completed 2 of 4</span>
            <div className="btn-group">
              <button className="btn btn-sm btn-secondary">All</button>
              <button className="btn btn-sm btn-outline-secondary">Completed</button>
              <button className="btn btn-sm btn-outline-secondary">Not Completed</button>
            </div>
          </div>
        </section>

        <section className="row justify-content-center">
          <div className="col-12 col-md-6">
            <hr />
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <input type="checkbox" className="form-check-input me-1" />
                  <label className="form-check-label">Item1</label>
                </div>
                <div className="btn-group">
                  <button className="btn btn-link text-black-50">
                    <i className="edit"></i>
                  </button>
                  <button className="btn btn-link text-black-50">
                    <i className="trash"></i>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  )
}

export default App
