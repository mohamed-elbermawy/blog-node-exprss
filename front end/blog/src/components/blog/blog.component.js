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
        console.log(response);
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
                <div className="d-flex col-10 offset-1 mt-4">
                  <div className="col-2">
                    <img
                      style={{ width: "150px", height: "100px" }}
                      src={"images/posts/" + post.image}
                      alt={post.image}
                    />
                  </div>
                  <div className="col-8">
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
                                style={{
                                  marginLeft: "5px",
                                  backgroundColor: "#bfbbbb",
                                  padding: "5px",
                                  borderRadius: "20px",
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </>
                        ) : null}
                        <p className="card-subtitle mt-2 text-muted">
                          <span>Author:</span>
                          <span>
                            {" " +
                              post.userid.firstname +
                              " " +
                              post.userid.lastname}
                          </span>
                        </p>
                      </div>
                      <div className="d-flex">
                        {token ? (
                          post.flag === "true" ? (
                            <>
                              <Link
                                to={"/posts/single/edit/" + post._id}
                                className="btn btn-secondary m-2"
                              >
                                Edit
                              </Link>
                              <Link
                                to={"/posts/single/delete/" + post._id}
                                className="btn btn-danger m-2"
                              >
                                Delete
                              </Link>
                            </>
                          ) : (
                            <button
                              className="btn btn-danger m-2"
                              onClick={() => {
                                handleFollowing(post.userid._id);
                              }}
                            >
                              Follow
                            </button>
                          )
                        ) : null}
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
