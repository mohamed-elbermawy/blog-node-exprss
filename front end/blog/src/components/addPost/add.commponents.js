import { useState } from "react";
import { useHistory } from "react-router-dom";
const axios = require("axios");

function AddPost() {
  let history = useHistory();
  let [title, setTitle] = useState("");
  let [body, setBody] = useState("");
  let token = localStorage.getItem("token");

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post(
        "http://localhost:5000/posts",
        {
          title: title,
          body: body,
        },
        {
          headers: { authorization: token },
        }
      )
      .then((response) => {
        // handle success
        history.push("/posts");
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleBodyChange(event) {
    setBody(event.target.value);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 offset-3 mt-5">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Post Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                onChange={handleTitleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="body">Post Content</label>
              <textarea
                className="form-control"
                id="body"
                rows="3"
                name="body"
                onChange={handleBodyChange}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary form-control">
              Add Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
