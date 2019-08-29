import React from "react";
import authService from "../services/authService";
import { Redirect } from "react-router-dom";

const Logout = () => {
  authService.logout();
  return <Redirect to="/" />;
};

export default Logout;
