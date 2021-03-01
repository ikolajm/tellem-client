import React from "react";
import { FaStopwatch } from "react-icons/fa";

export default ({data}) => {
    return (
        <div>
            {
                !data ?
                    "" :
                    <div className="outgoing">
                        <h1>Outgoing:</h1>
                        {
                            data.length > 0 ?
                                data.map(request => {
                                    let background = {
                                        background: request.user && request.user.background ? request.user.background : "pink"
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
                                                <button>Pending <FaStopwatch /></button>
                                            </div>
                                        </div>
                                    )
                                })
                                : <h1 className="null-header">No outgoing friend requests</h1>
                        }
                    </div>
            }
        </div>
    )
}