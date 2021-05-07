import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const axios = require("axios");

function Blog() {
  let [blog, setblog] = useState([]);
  let token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:5000/posts", {
        headers: { authorization: token },
      })
      .then((response) => {
        // handle success
        // console.log(response.data);
        setblog((blog = response.data.posts));
        console.log(blog);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
    // fetch("http://localhost:5000/posts")
    //   .then(function (response) {
    //     console.log(response);
    //     return response.json();
    //   })
    //   .then(function (myJson) {
    //     setblog((blog = myJson));
    //   });
  }, []);

  function handleFollowing(id) {
    axios
      .get("http://localhost:5000/users/following/" + id, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        // handle success
        // console.log(response);
        window.location.replace("http://localhost:3000/posts");
        // setblog((blog = response.data.posts));
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  return (
    <div className="container">
      {token ? (
        <div className="row col-12">
          <Link to="/posts/addpost" className="btn btn-primary mt-3 offset-11">
            add Post
          </Link>
        </div>
      ) : null}
      {blog.length !== 0
        ? blog.map((post) => {
            let day = new Date(post.createdAt);
            let date =
              day.getFullYear() +
              "-" +
              (day.getMonth() + 1) +
              "-" +
              day.getDate();
            let time =
              day.getHours() + ":" + day.getMinutes() + ":" + day.getSeconds();
            let dateTime = date + " " + time;
            return (
              <div className="row">
                <div className="col-10 offset-1 mt-4" style={{ height: "80%" }}>
                  <div className="d-flex ">
                    <div className="col-4">
                      <img
                        style={{
                          width: "300px",
                          height: "90%",
                          borderRadius: "10px",
                        }}
                        src={"images/posts/" + post.image}
                        alt={post.image}
                      />
                    </div>
                    <div className="col-6">
                      <div className="card">
                        <div className="card-body">
                          <Link
                            to={"/posts/single/" + post._id}
                            style={{ textDecoration: "none" }}
                          >
                            <h5 className="card-title">{post.title}</h5>
                          </Link>
                          <h6 className="card-subtitle mb-2 text-muted">
                            {dateTime}
                          </h6>
                          <p className="card-text">{post.body}</p>
                          {post.tags ? (
                            <>
                              {post.tags.map((tag) => (
                                <span
                                  className="card-text"
                                  style={{
                                    marginLeft: "5px",
                                    backgroundColor: "#bfbbbb",
                                    padding: "10px",
                                    borderRadius: "40px",
                                    fontSize: "10px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </>
                          ) : null}
                          <p className="card-subtitle mt-4 text-muted">
                            <span>
                              <img
                                style={{ width: "30px", borderRadius: "50%" }}
                                src="./images/profile/default_profile.png"
                                alt="profile"
                              />
                            </span>
                            <span>
                              {" " +
                                post.userid.firstname +
                                " " +
                                post.userid.lastname}
                            </span>
                          </p>
                        </div>
                        <div className="d-flex" style={{ marginLeft: "250px" }}>
                          {token ? (
                            post.flag === "true" ? (
                              <>
                                <Link
                                  to={"/posts/single/edit/" + post._id}
                                  className="btn btn-secondary mb-2 ml-2"
                                >
                                  Edit
                                </Link>
                                <Link
                                  to={"/posts/single/delete/" + post._id}
                                  className="btn btn-danger mb-2 ml-2"
                                >
                                  Delete
                                </Link>
                              </>
                            ) : (
                              <button
                                className="btn btn-danger"
                                style={{
                                  marginBottom: "10px",
                                  marginLeft: "70px",
                                }}
                                onClick={() => {
                                  handleFollowing(post.userid._id);
                                }}
                              >
                                {post.follow === "true" ? "Unfollow" : "Follow"}
                              </button>
                            )
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default Blog;
