import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Emp() {
  let [blog, setblog] = useState([{}]);

  useEffect(() => {
    fetch("https://cp-dev.eq.ademo.net/public/api/admin/employees")
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        setblog((blog = myJson.data.EmployeesData));
        console.log(blog);
      });
  }, []);

  return (
    <div className="container">
      <div className="row col-12">
        <Link to="/posts/addpost" className="btn btn-primary mt-3 offset-11">
          add Post
        </Link>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">name</th>
            <th scope="col">email</th>
            <th scope="col">actions</th>
          </tr>
        </thead>
        <tbody>
          {blog.map((post) => {
            return (
              <tr>
                <th scope="row">{post.id}</th>
                <td>{post.name}</td>
                <td>{post.email}</td>
                <td className="d-flex">
                  <div>
                    <Link
                      to={"/emp/show/" + post.id}
                      className="btn btn-primary mr-1"
                    >
                      Show
                    </Link>
                  </div>
                  <div>
                    <form
                      action={
                        "https://cp-dev.eq.ademo.net/public/api/admin/employees/" +
                        post.id +
                        "?_method=DELETE"
                      }
                      method="POST"
                    >
                      <button className="btn btn-danger" type="submit">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Emp;
