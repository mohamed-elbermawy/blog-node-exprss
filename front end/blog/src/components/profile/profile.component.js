import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
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
    /*<div class="page-content page-container" id="page-content">
      <div class="padding">
        <div class="row container d-flex justify-content-center">
          <div class="col-xl-6 col-md-12">
            <div class="card user-card-full">
              <div class="row m-l-0 m-r-0">
                <div class="col-sm-4 bg-c-lite-green user-profile">
                  <div class="card-block text-center text-white">
                    <div class="m-b-25">
                      {" "}
                      <img
                        src="https://img.icons8.com/bubbles/100/000000/user.png"
                        class="img-radius"
                        alt="User-Profile-Image"
                      />{" "}
                    </div>
                    <h6 class="f-w-600">Hembo Tingor</h6>
                    <p>Web Designer</p>{" "}
                    <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                  </div>
                </div>
                <div class="col-sm-8">
                  <div class="card-block">
                    <h6 class="m-b-20 p-b-5 b-b-default f-w-600">
                      Information
                    </h6>
                    <div class="row">
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Email</p>
                        <h6 class="text-muted f-w-400">rntng@gmail.com</h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Phone</p>
                        <h6 class="text-muted f-w-400">98979989898</h6>
                      </div>
                    </div>
                    <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                      Projects
                    </h6>
                    <div class="row">
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Recent</p>
                        <h6 class="text-muted f-w-400">Sam Disuja</h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Most Viewed</p>
                        <h6 class="text-muted f-w-400">Dinoter husainm</h6>
                      </div>
                    </div>
                    <ul class="social-link list-unstyled m-t-40 m-b-10">
                      <li>
                        <a
                          href="#!"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title=""
                          data-original-title="facebook"
                          data-abc="true"
                        >
                          <i
                            class="mdi mdi-facebook feather icon-facebook facebook"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title=""
                          data-original-title="twitter"
                          data-abc="true"
                        >
                          <i
                            class="mdi mdi-twitter feather icon-twitter twitter"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title=""
                          data-original-title="instagram"
                          data-abc="true"
                        >
                          <i
                            class="mdi mdi-instagram feather icon-instagram instagram"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>*/

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
