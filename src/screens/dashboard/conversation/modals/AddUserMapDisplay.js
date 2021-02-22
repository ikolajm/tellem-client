import React from "react";

export default ({friend, selected, modifyCheck}) => {
    let background = {
        background: friend.background
    }
    return (
        <div className="conversation-item">
            {/* User */}
            <div className="user-container">
                <div style={background} className="avatar">
                    <span>{friend.username.substring(0, 1)}</span>
                </div>
                {/* Name and last message receieved */}
                <div className="information">
                    <h1>{friend.username}</h1>
                    <h1>#{friend.idCode}</h1>
                </div>
            </div>
            {/* Check boxes */}
            <label class="checkbox-container">
                <input type="checkbox" checked={selected.includes(friend.id) ? "checked" : ""} />
                <span onClick={() => modifyCheck(friend.id)} class="checkmark"></span>
            </label>
        </div>
    )
}