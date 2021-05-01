import React from "react";
import { Route } from "react-router-dom";

import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

import Navbar from "./components/navbar/navbar.component";
import Blog from "./components/blog/blog.component";
import Login from "./components/login/login.component";
import Register from "./components/register/register.component";
import Search from "./components/search/search.component";
import Says from "./components/what followers says/says.compomnent";
import SingleBlog from "./components/singleBlog/singleblog.component";
import SingleBlogEdit from "./components/edit/edit.component";
import AddPost from "./components/addPost/add.commponents";
import DeletePost from "./components/deletePost/delete.component";
import Emp from "./components/test/emp.component";
import Show from "./components/test/show.component";

function App() {
  return (
    <>
      <Navbar />
      <Route path="/emp" component={Emp} exact />
      <Route path="/emp/show/:id" component={Show} />
      <Route path="/posts" component={Blog} exact />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/search" component={Search} />
      <Route path="/followers_says" component={Says} />
      <Route path="/posts/addpost" component={AddPost} />
      <Route path="/posts/single/:id" component={SingleBlog} exact />
      <Route path="/posts/single/edit/:id" component={SingleBlogEdit} />
      <Route path="/posts/single/delete/:id" component={DeletePost} />
    </>
  );
}

export default App;
