function AddPost() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6 offset-3 mt-5">
          <form method="post" action="http://localhost:5000/posts">
            <div class="form-group">
              <label for="title">Post Title</label>
              <input type="text" class="form-control" id="title" name="title" />
            </div>
            <div class="form-group">
              <label for="body">Post Content</label>
              <textarea
                class="form-control"
                id="body"
                rows="3"
                name="body"
              ></textarea>
            </div>
            <button type="submit" class="btn btn-primary form-control">
              Add Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
