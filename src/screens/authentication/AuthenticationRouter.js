import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import logo from "../../assets/tellem-cultureWhite.png"
import Login from "./Login";
import Signup from "./Signup";

export default ({user, setUser}) => {
    // If login is not necessary
    if (user) return <Redirect to="/dashboard/history" />

    return (
        <div className="authentication">
            <div className="content">
                {/* Header */}
                <h1>Got something to say?</h1>
                {/* Logo */}
                <img src={logo} alt="Tellem logo" />
                {/* Card + Toggle */}
                <Switch>
                    {/* Login */}
                    <Route exact path={`/authentication/login`}>
                        <Login setUser={setUser} />
                    </Route>
                    {/* Signup */}
                    <Route exact path={`/authentication/signup`}>
                        <Signup setUser={setUser} />
                    </Route>
                    {/* Default */}
                    <Route 
                        path={`/*`}
                        render={() => <Redirect to="/authentication/login" /> }
                    />
                </Switch>
            </div>
        </div>
    );
}
