import { useState } from "react";
import { useHistory } from "react-router-dom";
import "../style.css";
const axios = require("axios");

function AddPost() {
  let history = useHistory();
  let [title, setTitle] = useState("");
  let [body, setBody] = useState("");
  let [file, setFile] = useState("");
  let [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [titleerror, setTitleerror] = useState({});
  const [bodyerror, setBodyerror] = useState({});

  const token = localStorage.getItem("token");
  const textformat = /^[a-z ,.'-]+$/i;

  function handleSubmit(event) {
    event.preventDefault();

    const isValid = formValidation();

    if (isValid) {
      let data = new FormData();
      data.append("title", title);
      data.append("body", body);
      data.append("file", file);
      data.append("tags", tags);

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
          setError(error);
        });
    }
  }

  const formValidation = () => {
    let isValid = true;

    let titleError = {};
    let bodyError = {};

    if (!title.trim().match(textformat)) {
      titleError.titleerror = "Post Title is Required and must be characters";
      isValid = false;
    } else if (title.trim().length < 3) {
      titleError.titleerror = "Post Title must be minimum 3 characters";
      isValid = false;
    }

    if (!body.trim().match(textformat)) {
      bodyError.bodyerror = "Post Content is Required and must be characters";
      isValid = false;
    } else if (body.trim().length < 3) {
      bodyError.bodyerror = "Post Content must be minimum 3 characters";
      isValid = false;
    }

    setTitleerror(titleError);
    setBodyerror(bodyError);

    return isValid;
  };

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

  function handleTagsChange(event) {
    setTags(event.target.value);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 offset-3 mt-5" id="mainwrapper">
          {error ? (
            <div className="alert alert-danger">
              <span>
                Post Title and Post Content Required and must be at least 3
                characters
              </span>
            </div>
          ) : null}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              {Object.keys(titleerror).map((key) => {
                return (
                  <div className="alert alert-danger">
                    <span>{titleerror[key]}</span>
                  </div>
                );
              })}
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
              {Object.keys(bodyerror).map((key) => {
                return (
                  <div className="alert alert-danger">
                    <span>{bodyerror[key]}</span>
                  </div>
                );
              })}
              <label htmlFor="body">Post Content</label>
              <textarea
                className="form-control"
                id="body"
                rows="3"
                name="body"
                onChange={handleBodyChange}
              ></textarea>
            </div>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file__input"
                id="field-upload"
                name="upload"
                accept=".jpg"
                onChange={handleFileChange}
              />
              <label className="custom-file__label" for="field-upload">
                Upload Post Image
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="tags">Tags will be splited using (,)</label>
              <input
                className="form-control"
                type="text"
                id="tags"
                name="tags"
                onChange={handleTagsChange}
              />
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
