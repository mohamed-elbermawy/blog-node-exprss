import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
const axios = require("axios");

function EditProfile() {
  let history = useHistory();
  let { id } = useParams();
  let [email, setEmail] = useState("");
  let [firstname, setFirstname] = useState("");
  let [lastname, setLastname] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/userProfile/" + id)
      .then((response) => {
        // handle success
        console.log(response);
        setEmail((email = response.data[0].email));
        setFirstname((firstname = response.data[0].firstname));
        setLastname((lastname = response.data[0].lastname));
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .patch("http://localhost:5000/users/edit/" + id, {
        firstname: firstname,
        lastname: lastname,
      })
      .then((response) => {
        // handle success
        console.log(response);
        history.push("/profile");
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  function handleFirstnameChange(event) {
    setFirstname(event.target.value);
  }

  function handleLastnameChange(event) {
    setLastname(event.target.value);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-4 mt-5 offset-4">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                name="firstname"
                required
                value={firstname}
                onChange={handleFirstnameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                value={lastname}
                name="lastname"
                required
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
                name="email"
                disabled
                value={email}
              />
            </div>

            <button type="submit" className="btn btn-primary form-control">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
