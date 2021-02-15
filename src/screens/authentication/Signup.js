import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import signup from "../../helpers/authentication/signup";

export default ({setUser}) => {
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [confirm, setConfirm] = useState("");

    return (
        <div className="signup">
            <div className="card">
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-control" />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control" />
                </div>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input id="password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" />
                </div>
                <div>
                    <label htmlFor="confirm">Confirm Password:</label>
                    <input id="confirm" value={confirm} type="password" onChange={(e) => setConfirm(e.target.value)} className="form-control" />
                </div>
                <button onClick={() => signup(firstName, lastName, username, email, password, confirm, setUser)}>Submit</button>
            </div>
            <div className="toggle-container">
                <Link className="toggle" to="/authentication/login">Already have an account?</Link>
            </div>
        </div>
    );
}
