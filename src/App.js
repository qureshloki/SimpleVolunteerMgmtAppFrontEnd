import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navbar";
import StaffRoute from "./components/common/staffRoute";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import OpportunityForm from "./components/opportunityForm";
import Opportunities from "./components/opportunities";
import ApplicationForm from "./components/applicationForm";
import Unauthorized from "./components/unauthorized";
import NotFound from "./components/notFound";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <StaffRoute
              path="/opportunities/new"
              render={props => <OpportunityForm {...props} isNew />}
            />
            <Route
              path="/opportunities/:oppId/applications/new"
              component={ApplicationForm}
            />
            <Route path="/opportunities/:id" component={OpportunityForm} />
            <Route path="/opportunities" component={Opportunities} />
            <Route path="/unauthorized" component={Unauthorized} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/opportunities" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
