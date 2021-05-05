import { useState } from "react";
const axios = require("axios");

function Search() {
  let [key, setKey] = useState("");
  let [value, setValue] = useState("");
  let [blogs, setBlogs] = useState([]);

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
        console.log(response);
        // setBlogs((blogs = response.data.posts));
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
        <h4 className="mt-4">Search</h4>
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
                <option value="name">Name</option>
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
    </div>
  );
}

export default Search;
