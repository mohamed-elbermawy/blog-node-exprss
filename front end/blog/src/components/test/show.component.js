import { useEffect, useState } from "react";
import { useParams } from "react-router";

function Show() {
  let { id } = useParams();
  let [blog, setblog] = useState({});
  useEffect(() => {
    fetch("https://cp-dev.eq.ademo.net/public/api/admin/employees/" + id)
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
      <div className="row">
        <div className="d-flex col-10 offset-1 mt-5">
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
                <h5 className="card-title">{blog.name}</h5>
                <p className="card-text">{blog.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Show;
