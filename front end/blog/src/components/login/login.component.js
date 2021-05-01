function Login() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-4 mt-5 offset-4">
          <form method="post" action="http://localhost:5000/users/login">
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter your Email"
                required
                name="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your Password"
                required
                name="password"
              />
            </div>
            <button type="submit" className="btn btn-primary form-control">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
