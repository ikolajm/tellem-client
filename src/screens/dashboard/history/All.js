import React, { useState, useEffect } from "react";
import LoadingSmall from "../../loading/LoadingSmall";
import allLoad from "../../../helpers/dashboard/history/load/all";
import { TiGroup } from "react-icons/ti";
import { AiFillMessage } from "react-icons/ai";
import { FaArchive } from "react-icons/fa";
import { MdUnarchive } from "react-icons/md";
import moment from "moment";
import { Link } from "react-router-dom";
import unarchiveItem from "../../../helpers/dashboard/history/action/unarchive";
import allToggle from "../../../helpers/dashboard/history/action/allToggle";

export default ({user}) => {
    const [data, setData] = useState(null)

    useEffect(async () => {
        let response = await allLoad();
        setData(response)
    }, [])

    const domArchive = (e, conversation) => {
        allToggle(e, conversation, "ARCHIVE")
    }

    const domUnarchive = (e, conversation) => {
        allToggle(e, conversation, "UNARCHIVE")
    }

    console.log(data)
    return (
        <div>
            {
                !data ?
                    <LoadingSmall text="Gathering your conversations" /> :
                    <div className="data-container">
                        {
                            data.length > 0 ?
                                data.map(conversation => {
                                    let background = {
                                        background: conversation.background
                                    }
                                    return (
                                        <div className="conversation-item">
                                            {/* User */}
                                            <div className="user-container">
                                                <div style={background} className={conversation.users.length > 2 ? "avatar group-avatar" : "avatar"}>
                                                    <span>
                                                        {
                                                            // If group message
                                                            conversation.users.length > 2 ?
                                                                <TiGroup /> :
                                                                // Does the conversation have a name
                                                                conversation.name && conversation.name.trim() !== "" ?
                                                                    conversation.name.substring(0, 1) :
                                                                    // If logged in user is considered for avatar snippet
                                                                    conversation.users[0].id === user.id ?
                                                                        conversation.users[1].username.substring(0, 1) :
                                                                        conversation.users[0].username.substring(0, 1)

                                                        }
                                                    </span>
                                                </div>
                                                {/* Name and last message receieved */}
                                                <div className="information">
                                                    <h1>
                                                        {
                                                            // Does the conversation have a name
                                                            conversation.name && conversation.name.trim() !== "" ?
                                                                conversation.name :
                                                                // If logged in user is considered for avatar snippet
                                                                conversation.users[0].id === user.id ?
                                                                    conversation.users[1].username :
                                                                    conversation.users[0].username
                                                        }
                                                    </h1>
                                                    <h1>{moment(conversation.messages[0].createdAt).format("L")}</h1>
                                                </div>
                                            </div>
                                            {/* Last Message */}
                                            <div className="message">
                                                {
                                                    conversation.messages[0].userId === user.id ?
                                                        <em>You: </em> : ""
                                                }
                                                {conversation.messages[0].content.trim()}
                                            </div>
                                            {/* Option menu */}
                                            <div className="button-nav history-button-nav">
                                                {/* Go to conversation */}
                                                <button className="visible"><Link to={`/dashboard/conversation/${conversation.id}`}><AiFillMessage /></Link></button>
                                                {/* Archive */}
                                                <button className={conversation.archived ? "" : "visible"} onClick={(e) => domArchive(e, conversation)}><FaArchive /></button>
                                                {/* Unarchive */}
                                                <button className={conversation.archived ? "visible" : ""} onClick={(e) => domUnarchive(e, conversation)}><MdUnarchive /></button>
                                            </div>
                                        </div>
                                    )
                                })
                            : "No previous conversations"
                        }
                    </div>
            }
        </div>
    )
}