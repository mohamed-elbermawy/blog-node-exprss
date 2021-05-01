function Register() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-4 mt-5 offset-4">
          <form method="post" action="http://localhost:5000/users/register">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="Enter your First Name"
                required
                name="firstName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Enter your Last Name"
                required
                name="lastName"
              />
            </div>
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
            <div className="form-group">
              <label htmlFor="gender">gender</label>
              <select class="form-control" id="gender" name="gender">
                <option value="Male">Male</option>
                <option value="female">Female</option>
              </select>
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

export default Register;
