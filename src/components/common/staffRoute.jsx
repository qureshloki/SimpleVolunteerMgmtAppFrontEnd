import React, { Component as ReactComponent } from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import authService from "../../services/authService";

const StaffRoute = ({ path, component: Component, render, ...rest }) => {
  const user = authService.getCurrentUser();
  return (
    <Route
      path={path}
      {...rest}
      render={props => {
        if (!user) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
        if (!user.isStaff) {
          return <Redirect to="/unauthorized" />;
        }
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

StaffRoute.propTypes = {
  path: PropTypes.string,
  component: PropTypes.instanceOf(ReactComponent),
  render: PropTypes.func
};

export default StaffRoute;
