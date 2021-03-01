import React, { useEffect, useState, Fragment, useCallback } from "react";
import Loading from "../../loading/Loading";
import ConversationNavbar from "../contextual navbars/ConversationNavbar";
import { useParams } from "react-router-dom"
import APIURL from "../../../helpers/environment/apirouter";
import axios from "axios";
import { IoIosSend } from "react-icons/io"
import MessageSet from "./MessageSet"
import useChat from "../../../helpers/dashboard/conversation/useChat"
import { toast } from "react-toastify";
import moment from "moment"
import appendMessageSet from "../../../helpers/dashboard/conversation/appendMessageSet"
import appendMessageToSet from "../../../helpers/dashboard/conversation/appendMessageToSet";
// import InfiniteScroll from "react-infinite-scroll-component";

export default ({user}) => {
    const [conversation, setConversation] = useState()
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState("")
    const [offset, setOffset] = useState(0)

    let { id } = useParams();
    const fetchData = async () => {
        let url = `${APIURL}/conversation/${id}`;
        let request = await axios.post(
            url,
            {
                offset: (offset * 50)
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": sessionStorage.getItem("token")
                }
            }
        )
        request = request.data;
        // If there is more than 50, prepare to have infinite scroll
        // if (request && request.messages && request.messages.length === 51) {
        //     setHasMore(true)
        //     setOffset(1)
        // }
        return request.conversation;
    }

    // Get messages
    useEffect(async () => {
        let data = await fetchData();
        // See if there are more messages to load in
        setConversation(data)
        setLoading(false)
        let messages = document.getElementById("scrollableDiv");
        if (messages) {
            messages.scrollTop = messages.scrollHeight;
        }
    }, [])


    // Ensure scroll to bottom only when new message arrives
    const setRef = useCallback(node => {
        if (node) {
          node.scrollIntoView({ smooth: true })
        }
    }, [])

    const sendNewMessage = async (id) => {
        console.log(conversation)
        let url = `${APIURL}/message/create`
        let newMessage = await axios.post(
            url,
            {
                content: message,
                conversationId: id
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": sessionStorage.getItem("token")
                }
            }
        )
        newMessage = newMessage.data
        if (newMessage.status !== "SUCCESS") {
            return toast.error("Error sending message")
        }
        sendMessage(newMessage)
    }

    const messageEdited = async (editedMessage, conversation) => {
        
    }

    const messageDeleted = () => {}

    const receieveMessage = async (incomingMessage, conversation) => {
        incomingMessage = incomingMessage.message.message
        
        // Get creation date
        let createdAt = moment(incomingMessage.createdAt).format("L");
        // See if fits in with most recent dataSet
        let dataSet = conversation.messages[conversation.messages.length - 1]
        let messageHistory = document.getElementById("scrollableDiv");
        if (dataSet.date === createdAt) {
            appendMessageToSet(user, incomingMessage, conversation, messageHistory)
        } else {
            // Has a dataset already been appended
            console.log(messageHistory, messageHistory.lastChild, messageHistory.lastChild.previousSibling)
            let mostRecentDateNode = messageHistory.lastChild.previousSibling.childNodes[1]
            if (mostRecentDateNode.innerText === moment(incomingMessage.createdAt).format("L")) {
                appendMessageToSet(user, incomingMessage, conversation, messageHistory)
            } else {
                appendMessageSet(user, incomingMessage, conversation, messageHistory)
            }
        } 
        setMessage("")
        if (incomingMessage.userId === user.id) {
            messageHistory.scrollTop = messageHistory.scrollHeight;
        } else {
            // On new message notify user
        }
        console.log(messageHistory)
    }

    // Manage socket to watch live feed
    const { sendMessage, modifyMessage } = useChat(conversation, receieveMessage, messageEdited, messageDeleted)

    return (
        <Fragment>
            {
                loading ?
                    <Loading text="Redirecting to conversation..." /> :
                    <Fragment>
                        {/* Conversation Header */}
                        <ConversationNavbar user={user} data={conversation} setConversation={setConversation} />
                        {/* Conversation Display */}
                        <div className="conversation">
                            <div id="scrollableDiv" className="message-container">
                                    {
                                        conversation.messages && conversation.messages.length > 0 ?
                                            conversation.messages.map((messageSet, setIndex) => {
                                                return (
                                                    <MessageSet conversation={conversation} messageSet={messageSet} setIndex={setIndex} setRef={setRef} />
                                                )
                                            })
                                            : ""
                                    }
                            </div>
                            <div className="bumper"></div>
                            <div className="textbox-container">
                                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type message here."></textarea>
                                <div className="button-container">
                                <button id="sendButton" className="disabled" onClick={() => sendNewMessage(id)}><IoIosSend /></button>
                            </div>
                            </div>
                        </div>
                    </Fragment>
            }
        </Fragment>
    )
}