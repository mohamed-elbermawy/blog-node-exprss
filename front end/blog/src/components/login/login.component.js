import { useState } from "react";
import { useHistory } from "react-router-dom";
import "../style.css";

const axios = require("axios");

function Login() {
  let history = useHistory();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:5000/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        // handle success
        if (response.data.accessToken) {
          localStorage.setItem("token", response.data.accessToken);
          window.location.replace("http://localhost:3000/posts");
          // history.push("/posts");
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-4 mt-5 offset-4" id="mainwrapper">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter your Email"
                required
                name="email"
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your Password"
                required
                name="password"
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit" className="btn btn-primary form-control">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
