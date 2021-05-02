import { useParams } from "react-router";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
const axios = require("axios");

function DeletePost() {
  let { id } = useParams();
  let history = useHistory();
  useEffect(() => {
    axios
      .delete("http://localhost:5000/posts/" + id, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        // handle success
        console.log(response);
        history.push("/posts");
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);
  return "";
}

export default DeletePost;
