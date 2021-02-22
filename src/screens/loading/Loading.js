import React from "react";

export default ({ text }) => {
    return (
        <div className="loading-container">
            {/* <img src={logo} alt="Tellem Logo" /> */}
            <div className="loader"></div>
            <h1>{ text }</h1>
        </div>
    )
}