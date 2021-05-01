function AddPost() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6 offset-3 mt-5">
          <form method="post" action="http://localhost:5000/posts">
            <div className="form-group">
              <label htmlFor="title">Post Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="body">Post Content</label>
              <textarea
                className="form-control"
                id="body"
                rows="3"
                name="body"
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
