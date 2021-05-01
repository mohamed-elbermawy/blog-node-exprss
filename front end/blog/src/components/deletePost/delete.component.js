import { useParams } from "react-router";

function DeletePost() {
  let { id } = useParams();
  return <h1>{id}</h1>;
}

export default DeletePost;
