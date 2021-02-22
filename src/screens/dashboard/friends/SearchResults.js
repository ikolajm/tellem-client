import React, { useEffect, useState, Fragment } from "react";
import { IoIosPaperPlane } from "react-icons/io";
import { FaUserPlus, FaStopwatch, FaUserCheck, FaUserAlt } from "react-icons/fa";
import sendFriendRequest from "../../../helpers/dashboard/friends/action/sendFriendRequest";

export default ({user, data}) => {
    console.log(data)
    return (
        <Fragment>
            {
                data.users.map(friend => {
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
                            {/* Option menu */}
                            <div className="button-nav search-results-buttons">
                                {
                                    // If the user is already friends
                                    data.friends.includes(friend.id) ? 
                                        <button className="visible">Friends <FaUserCheck /></button> :
                                        // If the request is awaiting action in the menu
                                        data.pending.includes(friend.id) ?
                                            <button className="visible">Pending <FaStopwatch /></button> :
                                            // If the search is the logged in user
                                            friend.id === user.id ?
                                                <button className="visible">You <FaUserAlt /></button> :
                                                // If the user is able to receive a request from the user
                                                <button className="visible" onClick={(e) => sendFriendRequest(e, friend.uuid)}>Add friend <FaUserPlus /></button>
                                }
                                <button>Sent <IoIosPaperPlane /></button>
                            </div>
                        </div>
                    )
                })
            }
        </Fragment>
    )
}