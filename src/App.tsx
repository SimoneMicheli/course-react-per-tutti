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
        <section className="row justify-content-center ">
          <div className="col-12 col-lg-6 text-center">
            <h1 className="page-title">
              <span>React per tutti (o quasi)</span>
            </h1>
          </div>
        </section>

        <section className="row justify-content-center">
          <div className="col-12 col-md-8 ">
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
          <div className="col-12 col-md-8">
            <div className="row">
              <div className="col-12 col-lg-9 btn-toolbar">
                <div className="btn-group">
                  <button className="btn btn-sm btn-primary">Tutti</button>
                  <button className="btn btn-sm btn-outline-primary">Completati</button>
                  <button className="btn btn-sm btn-outline-primary">Non completati</button>
                </div>
                <div className="btn-group ms-1">
                  <button className="btn btn-sm btn-outline-secondary">Rimuovi completati</button>
                </div>
              </div>
              <div className="col-12 col-lg-3 d-lg-flex justify-content-end align-items-center mt-2 mt-lg-0">
                <span>Completati 2 di 4</span>
              </div>
            </div>
          </div>
        </section>

        <section className="row justify-content-center">
          <div className="col-12 col-md-8">
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
