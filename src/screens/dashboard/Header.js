import React from "react";
import logoLrg from "../../assets/tellem-cultureWhite.png"
import logoSm from "../../assets/tellem-logoOnly.png"
import { FiLogOut } from "react-icons/fi";
import { IoIosSettings } from "react-icons/io/";
import { Link } from "react-router-dom";
import logout from "../../helpers/authentication/logout";

export default ({user, setUser}) => {
    const background = {
        backgroundColor: user.background
    }
    return (
        <div className="header">
            {/* Logo */}
            <img className="logo-large" src={logoLrg} alt="Tellem Logo" />
            <img className="logo-small" src={logoSm} alt="Tellem Logo" />
            {/* User Section */}
            <div className="user-card">
                {/* Avatar */}
                <div style={background} className="avatar">
                    <span>{user.username.substring(0, 1)}</span>
                </div>
                {/* Name + ID */}
                <div className="information">
                    <h1>{user.username}</h1>
                    <h1>#{user.idCode}</h1>
                </div>
                {/* Profile Edit Icon */}
                <button><Link to="/dashboard/profile"><IoIosSettings /></Link></button>
                {/* Logout Button */}
                <button onClick={() => logout(setUser)}><FiLogOut /></button>
            </div>
        </div>
    )
}