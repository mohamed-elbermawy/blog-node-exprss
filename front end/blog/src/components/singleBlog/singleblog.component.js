import { useEffect, useState } from "react";
import { useParams } from "react-router";

function SingleBlog() {
  let { id } = useParams();
  let [blog, setblog] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:5000/posts/" + id)
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        setblog((blog = myJson));
        console.log(blog);
      });
  }, []);

  return (
    <div className="container">
      {blog.map((post) => {
        let day = new Date(post.createdAt);
        let date =
          day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
        let time =
          day.getHours() + ":" + day.getMinutes() + ":" + day.getSeconds();
        let dateTime = date + " " + time;
        return (
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
                    <h5 className="card-title">{post.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {dateTime}
                    </h6>
                    <p className="card-text">{post.body}</p>
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
export default SingleBlog;
