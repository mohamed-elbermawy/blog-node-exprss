import { useState } from "react";
import { useHistory } from "react-router-dom";
const axios = require("axios");

function AddPost() {
  let history = useHistory();
  let [title, setTitle] = useState("");
  let [body, setBody] = useState("");
  let [file, setFile] = useState("");
  let token = localStorage.getItem("token");

  function handleSubmit(event) {
    event.preventDefault();
    let data = new FormData();
    data.append("title", title);
    data.append("body", body);
    data.append("file", file);
    axios
      .post(
        "http://localhost:5000/posts",
        // {
        //   title: title,
        //   body: body,
        //   file: file,
        // },
        data,
        {
          headers: { authorization: token },
        }
      )
      .then((response) => {
        // handle success
        // console.log(response);
        // history.push("/posts");
        window.location.replace("http://localhost:3000/posts");
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

  function handleFileChange(event) {
    const file = event.target.files[0];
    setFile(file);
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
            <div className="form-group">
              <input
                className="form-control"
                type="file"
                id="file"
                accept=".jpg"
                onChange={handleFileChange}
              ></input>
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
