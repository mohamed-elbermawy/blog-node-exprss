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
  let [gender, setGender] = useState("");
  const [emailerror, setEmailerror] = useState({});
  const [passworderror, setPassworderror] = useState({});
  const [firstnameerror, setFirstnameerror] = useState({});
  const [lastnameerror, setLastnameerror] = useState({});
  const [gendererror, setGendererror] = useState({});
  const [duplicateemail, setDuplicateemailerror] = useState("");

  const mailformat =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const nameformat = /^[a-z ,.'-]+$/i;

  function handleSubmit(event) {
    event.preventDefault();

    const isValid = formValidatiom();

    if (isValid) {
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
          setDuplicateemailerror(error);
        });
    }
  }

  const formValidatiom = () => {
    let isValid = true;
    const emailError = {};
    const firstnameError = {};
    const lastnameError = {};
    const passwordError = {};
    const genderError = {};

    if (!email.trim().match(mailformat)) {
      emailError.emailerror =
        "Invalid Email (Email must be example@example.com)!!!";
      isValid = false;
    }

    if (password.trim() === "") {
      passwordError.passworderror = "Password is Required!!!";
      isValid = false;
    } else if (password.trim().length < 5) {
      passwordError.passworderror = "Password must be minimum 5 !!!";
      isValid = false;
    }

    if (!firstname.trim().match(nameformat)) {
      firstnameError.firstnameerror = "First Name must be characters!!!";
      isValid = false;
    } else if (firstname.trim().length < 3 || firstname.trim().length > 15) {
      firstnameError.firstnameerror =
        "First Name must be minimum 3 characters and maximum 15 !!!";
      isValid = false;
    }

    if (!lastname.trim().match(nameformat)) {
      lastnameError.firstnameerror = "Last Name must be characters!!!";
      isValid = false;
    } else if (lastname.trim().length < 3 || lastname.trim().length > 15) {
      lastnameError.firstnameerror =
        "Last Name must be minimum 3 characters and maximum 15 !!!";
      isValid = false;
    }

    if (gender.trim() === "") {
      genderError.gendererror = "Gender is Required!!!";
      isValid = false;
    }

    setEmailerror(emailError);
    setPassworderror(passwordError);
    setFirstnameerror(firstnameError);
    setLastnameerror(lastnameError);
    setGendererror(genderError);

    return isValid;
  };

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
        <div className="col-6 mt-5 offset-3" id="mainwrapper">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              {Object.keys(firstnameerror).map((key) => {
                return (
                  <div className="alert alert-danger">
                    <span>{firstnameerror[key]}</span>
                  </div>
                );
              })}
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="Enter your First Name"
                name="firstName"
                onChange={handleFirstnameChange}
              />
            </div>
            <div className="form-group">
              {Object.keys(lastnameerror).map((key) => {
                return (
                  <div className="alert alert-danger">
                    <span>{lastnameerror[key]}</span>
                  </div>
                );
              })}
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Enter your Last Name"
                name="lastName"
                onChange={handleLastnameChange}
              />
            </div>
            <div className="form-group">
              {Object.keys(emailerror).map((key) => {
                return (
                  <div className="alert alert-danger">
                    <span>{emailerror[key]}</span>
                  </div>
                );
              })}
              {duplicateemail ? (
                <div className="alert alert-danger">
                  <span>Email already Exists !!!</span>
                </div>
              ) : null}
              <label htmlFor="email">Email address</label>
              <input
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter your Email"
                name="email"
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group">
              {Object.keys(passworderror).map((key) => {
                return (
                  <div className="alert alert-danger">
                    <span>{passworderror[key]}</span>
                  </div>
                );
              })}
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your Password"
                name="password"
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-group">
              {Object.keys(gendererror).map((key) => {
                return (
                  <div className="alert alert-danger">
                    <span>{gendererror[key]}</span>
                  </div>
                );
              })}
              <label htmlFor="gender">gender</label>
              <select
                class="form-control"
                id="gender"
                name="gender"
                onChange={handleGenderChange}
              >
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
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
