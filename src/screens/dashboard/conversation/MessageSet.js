import React, { Fragment } from "react";
import moment from "moment";

export default ({conversation, messageSet, setIndex, setRef}) => {
    const giveAvatarSpecificColor = uuid => {
        let user = conversation.users.filter(x => x.uuid === uuid);
        user = user[0];
        const background = {
            backgroundColor: user.background
        }
        return background;
    }

    return (
        <Fragment>
            {/* Message set meta */}
            <div className="date-seperator">
                <div className="line"></div>
                <span>{moment(messageSet.date).format("L")}</span>
            </div>
            {/* Message set message map */}
            <div className="message-group-content">
                {
                    messageSet.messages.map((message, messageIndex) => {
                        // Keep track of the last message and watch for incoming new messages
                        const lastMessage = setIndex === messageSet.length - 1 && messageIndex === messageSet.messages.length - 1
                        return (
                            <div id={message.uuid} className="message-item">
                                {/* Avatar */}
                                <div style={giveAvatarSpecificColor(message.user.uuid)} className="avatar">
                                    <span>
                                        {
                                            message.user.username.substring(0, 1)
                                        }
                                    </span>
                                </div>
                                {/* User/message info */}
                                <div className="meta-container">
                                    {/* Username */}
                                    <strong><span>{message.user.username}</span></strong>
                                    {/* Sent date */}
                                    <span className="date">{moment(message.createdAt).format("LT")}</span>
                                    {/* Edited date */}
                                    {
                                        message.edited ?
                                        <div className="tooltiptest">
                                            <em className="edited">Edited</em>
                                            {/* Edited */}
                                            <span className="tooltiptext">{moment(message.updatedAt).format('LLL')}</span>
                                        </div>
                                        : ""
                                    }
                                    {/* Message */}
                                    <p>{message.content}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </Fragment>
    )
}