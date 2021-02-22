import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import saveChanges from "../../../helpers/dashboard/profile/saveChanges";

export default ({user, setUser}) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [username, setUsername] = useState(user.username);
    const [idCode, setIdCode] = useState(user.idCode);
    const [statusMessage, setStatusMessage] = useState(user.statusMessage);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <div className="profile container">
            <small>* - Required Field</small>
            <h1>Account Information:</h1>
            <div className="card-container row">
                <div className="col-12">
                    {/* Username */}
                    <div className="row">
                        <div id="username" className="col-md-8 input-container">
                            <label>Username (max 20, min 3 chars.) *:</label>
                            <input className="form-control" value={username} minLength="1" maxLength="20" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        {/* ID code */}
                        <div id="idCode" className="col-md-4 input-container">
                            <label>Identifier Code (5 digits) *:</label>
                            <input className="form-control" value={idCode} minLength="5" maxLength="5" onChange={(e) => setIdCode(e.target.value)} />
                        </div>
                    </div>
                    {/* Status */}
                    <div className="input-container">
                        <label>Status (Max 140 chars.):</label>
                        <textarea maxLength="140" className="form-control" value={statusMessage} onChange={(e) => setStatusMessage(e.target.value)}></textarea>
                    </div>
                </div>
            </div>
            <h1>Personal Information:</h1>
            <div className="card-container row">
                <div className="col-12">
                    {/* First Name */}
                    <div className="">
                        <div className="row">
                            <div id="firstName" className="col-md-6 input-container">
                                <label>First Name *:</label>
                                <input className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            {/* Last Name */}
                            <div id="lastName" className="col-md-6 input-container">
                                <label>Last Name *:</label>
                                <input className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    {/* Email */}
                    <div id="email" className="input-container">
                        <label>Email *:</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(email)} />
                    </div>
                    {/* Passwords */}
                    <div className="">
                        <div className="row">
                            <div id="password" className="col-md-6 input-container">
                                <label>Password:</label>
                                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            {/* Confirm */}
                            <div id="confirmPassword" className="col-md-6 input-container">
                                <label>Confirm Password:</label>
                                <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Action Buttons */}
            <div className="action-buttons">
                <Link to="/dashboard/history"><button><IoMdArrowBack />Go Back</button></Link>
                <button type="submit" className="save" onClick={(e) => saveChanges(e, user, setUser, username, idCode, statusMessage, firstName, lastName, email, password, confirmPassword)}>Save Changes</button>
            </div>
        </div>
    )
}