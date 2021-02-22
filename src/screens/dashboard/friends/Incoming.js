import React from "react";
import { ImCross, ImCheckmark } from "react-icons/im";
import acceptRequest from "../../../helpers/dashboard/friends/action/accept";
import declineRequest from "../../../helpers/dashboard/friends/action/decline";

export default ({data}) => {

    console.log(data)
    return (
        <div>
            {
                !data ?
                    "" :
                    <div className="incoming">
                        <h1>Incoming:</h1>
                        {
                            data.length > 0 ?
                                data.map(request => {
                                    let background = {
                                        background: request.user.background
                                    }
                                    return (
                                        <div className="conversation-item">
                                            {/* User */}
                                            <div className="user-container">
                                                <div style={background} className="avatar">
                                                    <span>{request.user.username.substring(0, 1)}</span>
                                                </div>
                                                {/* Name and last message receieved */}
                                                <div className="information">
                                                    <h1>{request.user.username}</h1>
                                                    <h1>#{request.user.idCode}</h1>
                                                </div>
                                            </div>
                                            {/* Last Message */}
                                            <div className="message">
                                                {
                                                    request.user.statusMessage && request.user.statusMessage.trim() !== "" ?
                                                    "'" + request.user.statusMessage + "'" : <em>No status available</em>
                                                }
                                            </div>
                                            {/* Option menu */}
                                            <div className="button-nav">
                                                {/* Create Message */}
                                                <button onClick={(e) => acceptRequest(e,request)}><ImCheckmark /></button>
                                                {/* Archive */}
                                                <button onClick={(e) => declineRequest(e, request)}><ImCross /></button>
                                            </div>
                                        </div>
                                    )
                                })
                            : <h1 className="null-header">No incoming friend requests</h1>
                        }
                    </div>
            }
        </div>
    )
}