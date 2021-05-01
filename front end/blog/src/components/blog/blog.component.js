import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const axios = require("axios");

function Blog() {
  let [blog, setblog] = useState([{}]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts")
      .then((response) => {
        // handle success
        setblog((blog = response.data));
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

  return (
    <div className="container">
      <div className="row col-12">
        <Link to="/posts/addpost" className="btn btn-primary mt-3 offset-11">
          add Post
        </Link>
      </div>
      {blog.map((post) => {
        let day = new Date(post.createdAt);
        let date =
          day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
        let time =
          day.getHours() + ":" + day.getMinutes() + ":" + day.getSeconds();
        let dateTime = date + " " + time;
        return (
          <div className="row">
            <div className="d-flex col-10 offset-1 mt-4">
              <div className="col-2">
                <img
                  style={{ width: "150px", height: "100px" }}
                  src="https://images.unsplash.com/photo-1571023479098-1ed95127545e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
                  alt=""
                />
              </div>
              <div className="col-8">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {dateTime}
                    </h6>
                    <p className="card-text">{post.body}</p>
                  </div>
                  <div className="d-flex">
                    <Link
                      to={"/posts/single/" + post._id}
                      className="btn btn-primary m-2"
                    >
                      Show
                    </Link>
                    <Link
                      to={"/posts/single/edit/" + post._id}
                      className="btn btn-secondary m-2"
                    >
                      Edit
                    </Link>
                    <form
                      action={
                        "http://localhost:5000/posts/" +
                        post._id +
                        "?_method=DELETE"
                      }
                      method="POST"
                    >
                      <button className="btn btn-danger m-2" type="submit">
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Blog;
