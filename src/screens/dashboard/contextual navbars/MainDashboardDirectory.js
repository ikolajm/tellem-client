import React from "react";
import { NavLink } from "react-router-dom";

export default () => {
    return (
        <div className="dashboard-navigation">
            <NavLink to="/dashboard/history" activeClassName="active-nav-link">History</NavLink>
            <NavLink to="/dashboard/friends" activeClassName="active-nav-link">Friends</NavLink>
        </div>
    )
}