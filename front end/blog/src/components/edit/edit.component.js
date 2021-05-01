import { useEffect, useState } from "react";
import { useParams } from "react-router";
const axios = require("axios");

function SingleBlogEdit() {
  let { id } = useParams();
  let [blog, setblog] = useState([{}]);
  let [title, setTitle] = useState("");
  let [body, setBody] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts/", {
        params: {
          id: id,
        },
      })
      .then((response) => {
        // handle success
        setblog((blog = response.data));
        setTitle((title = response.data[0].title));
        setBody((body = response.data[0].body));
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
    // fetch("http://localhost:5000/posts/" + id)
    //   .then(function (response) {
    //     console.log(response);
    //     return response.json();
    //   })
    //   .then(function (myJson) {
    //     setblog((blog = myJson));
    //     console.log(blog);
    //     setTitle((title = myJson)[0].title);
    //     setBody((body = myJson)[0].body);
    //     console.log(title);
    //     console.log(body);
    //   });
  }, []);

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
          <form
            method="post"
            action={"http://localhost:5000/posts/" + id + "?_method=PATCH"}
          >
            <div className="form-group">
              <label htmlFor="title">Post Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={title}
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
                value={body}
                onChange={handleBodyChange}
              ></textarea>
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

export default SingleBlogEdit;
