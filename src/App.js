import './styles/App.scss';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from "react";
import { ToastContainer, Zoom } from "react-toastify";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import checkToken from "./helpers/authentication/checkToken";
import AuthenticationRouter from "./screens/authentication/AuthenticationRouter";
import DashboardRouter from "./screens/dashboard/DashboardRouter";

export default withRouter(() => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    checkToken(token, user, setUser)
  })
  return (
    <div className="app">
      <Switch>
        {/* Authentication Screens */}
        <Route path="/authentication">
          <AuthenticationRouter user={user} setUser={setUser} />
        </Route>
        {/* Dashboard */}
        <Route path="/dashboard">
          <DashboardRouter user={user} setUser={setUser} />
        </Route>
        <Route 
          path="/*" 
          render={() => user ? <Redirect to="/dashboard" /> : <Redirect to="/authentication" />}
        />
      </Switch>
      {/* Notification container */}
      <ToastContainer 
        position="bottom-center"
        closeButton={true}
        hideProgressBar={true}
        draggable={false}
        transition={Zoom}
        limit={1}
        autoClose={3000}
      />
    </div>
  );
})