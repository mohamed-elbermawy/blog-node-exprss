import { useState } from "react";
import { Link } from "react-router-dom";
const axios = require("axios");

function Search() {
  let [blog, setblog] = useState([]);
  let [key, setKey] = useState("");
  let [value, setValue] = useState("");
  let token = localStorage.getItem("token");

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .get(
        "http://localhost:5000/posts/search/" + key + "/" + value
        // , {
        //   headers: { authorization: token },
        // }
      )
      .then((response) => {
        // handle success
        // console.log(response.data.posts);
        setblog((blog = response.data.posts));
        console.log(blog);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  function handleKeychange(event) {
    setKey(event.target.value);
  }

  function handleValuechange(event) {
    setValue(event.target.value);
  }

  return (
    <div className="container">
      <div className="row">
        <h4 className="mt-4" style={{ color: "aliceblue" }}>
          Search
        </h4>
        <div className="col-12 mt-3">
          <form className="d-flex" onSubmit={handleSubmit}>
            <div className="form-group col-4">
              <select
                className="form-control"
                name="key"
                onChange={handleKeychange}
              >
                <option>Select key To Search With</option>
                <option value="tags">Tags</option>
                <option value="title">Title</option>
              </select>
            </div>
            <div className="form-group col-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter The value"
                name="value"
                onChange={handleValuechange}
              />
            </div>

            <div className="form-group col-4">
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
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
                          height: "88%",
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

export default Search;
