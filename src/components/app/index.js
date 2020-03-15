import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import Dashboard from "../Dashboard/container";
import "typeface-roboto";
import "./index.css";

class Application extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/dashboard" component={Dashboard} />
        </Router>
      </div>
    );
  }
}

export default Application;
