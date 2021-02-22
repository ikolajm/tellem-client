import React, { useState, useEffect } from "react";
import LoadingSmall from "../../loading/LoadingSmall";
import archiveLoad from "../../../helpers/dashboard/history/load/archive";
import { TiGroup } from "react-icons/ti";
import { AiFillMessage } from "react-icons/ai";
import { MdUnarchive } from "react-icons/md";
import moment from "moment";
import { Link } from "react-router-dom";
import unarchiveItem from "../../../helpers/dashboard/history/action/unarchive";

export default ({user}) => {
    const [data, setData] = useState(null)

    useEffect(async () => {
        let response = await archiveLoad();
        setData(response)
    }, [])

    console.log(data)
    return (
        <div>
            {
                !data ?
                    <LoadingSmall text="Gathering your conversations" /> :
                    <div className="data-container">
                        {
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
                                        <div className="button-nav">
                                            {/* Go to conversation */}
                                            <button><Link to={`/dashboard/conversation/${conversation.id}`}><AiFillMessage /></Link></button>
                                            {/* Archive */}
                                            <button onClick={(e) => unarchiveItem(e, conversation)}><MdUnarchive /></button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
            }
        </div>
    )
}