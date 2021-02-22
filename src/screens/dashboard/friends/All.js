import React, { useState, useEffect, Fragment } from "react";
import LoadingSmall from "../../loading/LoadingSmall";
import allLoad from "../../../helpers/dashboard/friends/load/all";
import { AiFillMessage } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa"
import { Redirect } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import APIURL from "../../../helpers/environment/apirouter";

export default ({user}) => {
    const [data, setData] = useState(null)
    const [modal, setModal] = useState(false)
    const [profile, setProfile] = useState(null)
    const [content, setContent] = useState("")
    const [redirect, setRedirect] = useState(null)

    useEffect(async () => {
        let response = await allLoad();
        setData(response)
    }, [])

    const createMessage = (friend) => {
        setModal(true)
        setProfile(friend)
    }

    const closeModal = () => {
        setProfile(null)
        setContent("")
        setModal(false)
    }

    const sendMessage = async (e, friendId) => {
        e.preventDefault()
        let url = `${APIURL}/conversation/create`;
        let request = await axios.post(
            url,
            {
                friendId,
                content
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": sessionStorage.getItem("token")
                }
            }
        )
        request = request.data
        console.log(request)
        if (request.status === "SUCCESS") {
            let conversationURL =  `/dashboard/conversation/${request.conversationId}`
            setRedirect(conversationURL)
        }
    }

    console.log(modal, profile)
    return (
        <Fragment>
            {
                redirect ? 
                    <Redirect to={redirect} /> :
                    <div>
                        {
                            !data ?
                                <LoadingSmall text="Gathering friends..." /> :
                                <div className="data-container">
                                    {
                                        data.map(friend => {
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
                                                    {/* Last Message */}
                                                    <div className="message">
                                                        {
                                                            friend.statusMessage && friend.statusMessage.trim() !== "" ?
                                                                "'" + friend.statusMessage + "'" : <em>No status available</em>
                                                        }
                                                    </div>
                                                    {/* Option menu */}
                                                    <div className="button-nav">
                                                        {/* Create Message */}
                                                        <button onClick={() => createMessage(friend)} className="visible"><AiFillMessage /></button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    {/* Send Message Modal */}
                                    {
                                        profile && profile.username ?
                                            <Modal isOpen={modal} toggle={() => closeModal()}>
                                                <ModalHeader>
                                                    <h1>Send Message to {profile.username}</h1>
                                                </ModalHeader>
                                                <ModalBody>
                                                    <form>
                                                        <label htmlFor="content">Message Content:</label>
                                                        <textarea className="form-control" id="content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                                                    </form>
                                                </ModalBody>
                                                <ModalFooter>
                                                        <div className="modal-buttons">
                                                            <button onClick={() => closeModal()}>Cancel</button>
                                                            <button type="submit" onClick={(e) => sendMessage(e, profile.id)}>Send</button>
                                                        </div>
                                                </ModalFooter>
                                            </Modal>
                                            : ""
                                    }
                                </div>
                        }
                    </div>
            }
        </Fragment>
    )
}