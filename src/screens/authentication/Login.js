import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import login from "../../helpers/authentication/login";

export default ({setUser}) => {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    console.log("login")
    return (
        <div className="login">
            <form className="card">
                <div>
                    <label htmlFor="email">Email:</label>
                    <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input id="password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" />
                </div>
                <button type="submit" onClick={(e) => login(e, email, password, setUser)}>Submit</button>
            </form>
            <div className="toggle-container">
                <Link className="toggle" to="/authentication/signup">Don't have an account yet?</Link>
            </div>
        </div>
    );
}
