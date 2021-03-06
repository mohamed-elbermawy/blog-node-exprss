import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  let token = localStorage.getItem("token");
  function handleLogout() {
    localStorage.removeItem("token");
    window.location.replace("http://localhost:3000/posts");
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/posts" className="navbar-brand">
          <span className="text-danger font-weight-bold">Bl</span>og
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {/*<li className="nav-item active">
              <Link className="nav-link" to="/Emp">
                Emp
              </Link>
  </li>*/}
            <li className="nav-item active">
              <Link className="nav-link" to="/posts">
                HOME
              </Link>
            </li>
            {token ? (
              <li className="nav-item active">
                <Link className="nav-link" to="/followers_says">
                  WHAT FOLLOWERS SAYS!
                </Link>
              </li>
            ) : null}
            {token ? (
              <li className="nav-item active">
                <Link className="nav-link" to="/profile">
                  PROFILE
                </Link>
              </li>
            ) : null}
          </ul>
          {token ? (
            <Link
              to="/search"
              className="btn btn-outline-success mx-2 my-2 my-sm-0"
            >
              Search
            </Link>
          ) : null}
          {token ? (
            <button
              className="btn btn-outline-success mx-2 my-2 my-sm-0"
              onClick={handleLogout}
            >
              logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-outline-success mx-2 my-2 my-sm-0"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-outline-success mx-2 my-2 my-sm-0"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
