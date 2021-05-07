import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const axios = require("axios");

function Profile() {
  let [users, setUsers] = useState([]);
  let token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:5000/users/profile", {
        headers: { authorization: token },
      })
      .then((response) => {
        // handle success
        // console.log(response.data);
        setUsers((users = response.data));
        console.log(users);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);
  return (
    <div className="container">
      <div className="row">
        {users.length !== 0
          ? users.map((user) => {
              return (
                <div className="mt-5">
                  <div className="media col-12">
                    <img
                      src="./images/profile/default_profile.png"
                      className="mr-3 col-2"
                      alt={user.firstname + " " + user.lastname}
                      style={{ borderRadius: "50%" }}
                    />
                    <p
                      style={{
                        position: "absolute",
                        marginTop: "160px",
                        marginLeft: "50px",
                        fontWeight: "bold",
                      }}
                    >
                      Follwing:{" "}
                      <span className="badge badge-secondary">
                        {user.following.length}
                      </span>
                    </p>
                    <Link
                      to=""
                      className="btn btn-success"
                      style={{
                        position: "absolute",
                        marginTop: "200px",
                        marginLeft: "65px",
                      }}
                    >
                      Edit
                    </Link>
                    <div className="media-body col-9">
                      <h5 className="mt-0">
                        {user.firstname + " " + user.lastname}
                      </h5>
                      <span className="mt-3 d-block font-weight-bold">
                        Email: <span className="text-muted">{user.email}</span>
                      </span>
                      <span className="mt-3 d-block font-weight-bold">
                        Gender:{" "}
                        <span className="text-muted">{user.gender}</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default Profile;
