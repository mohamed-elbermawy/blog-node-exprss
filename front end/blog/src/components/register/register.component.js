import { useState } from "react";
import { useHistory } from "react-router-dom";
import "../style.css";
const axios = require("axios");

function Register() {
  let history = useHistory();

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [firstname, setFirstname] = useState("");
  let [lastname, setLastname] = useState("");
  let [gender, setGender] = useState("Male");

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:5000/users/register", {
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
        gender: gender,
      })
      .then((response) => {
        // handle success
        history.push("/login");
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

  function handleFirstnameChange(event) {
    setFirstname(event.target.value);
  }

  function handleLastnameChange(event) {
    setLastname(event.target.value);
  }

  function handleGenderChange(event) {
    setGender(event.target.value);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-4 mt-5 offset-4" id="mainwrapper">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="Enter your First Name"
                required
                name="firstName"
                onChange={handleFirstnameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Enter your Last Name"
                required
                name="lastName"
                onChange={handleLastnameChange}
              />
            </div>
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
            <div className="form-group">
              <label htmlFor="gender">gender</label>
              <select
                class="form-control"
                id="gender"
                name="gender"
                onChange={handleGenderChange}
              >
                <option value="Male">Male</option>
                <option value="female">Female</option>
              </select>
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

export default Register;
