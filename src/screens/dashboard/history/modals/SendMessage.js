import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import AddUserMapDisplay from "../../conversation/modals/AddUserMapDisplay";
import {toast} from "react-toastify";

export default ({user, open, setModal, friends, createConversation}) => {
    const [content, setContent] = useState("")
    const [selected, setSelected] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [filter, setFilter] = useState("")
    const [filtered, setFiltered] = useState([])

    const closeModal = async () => {
        setContent("")
        setSelected([])
        setSelectedUser(null)
        setModal(false)
    }

    const sendMessage = async (e, selected, content) => {
        e.preventDefault()
        if (!selectedUser) {
            return toast.error("Please make sure a recipient is selected")
        } else if (content.trim() === "") {
            return toast.error("Please make sure the message has content")
        }

        createConversation(e, selected, content)
    }

    const filterFriends = (string) => {
        let copy = [...friends]
        let filteredFriends = copy.filter(friend => friend.username.toLowerCase().includes(string))
        setFilter(string)
        setFiltered(filteredFriends)
    }

    const modifyCheck = (id) => {
        if (selected.includes(id)) {
            setSelected([])
            setSelectedUser(null)
        } else {
            let friend = friends.filter(friend => friend.id === id)
            friend = friend[0]
            setSelected([id])
            setSelectedUser(friend)
        }
    }

    console.log(selected, selectedUser)
    return (
        <div>
            {/* Send Message Modal */}
            <Modal className="view-user-modal" isOpen={open} toggle={() => closeModal()}>
                <ModalHeader>
                    <h1>Create Conversation</h1>
                </ModalHeader>
                <ModalBody>
                    {/* Friendslist to message */}
                    <div className="user-search">
                        <div>
                            <label htmlFor="filter">Filter Friends:</label>
                            <input autoComplete="off" className="form-control" id="filter" type="text" placeholder={filter} onChange={(e) => filterFriends(e.target.value)} />
                        </div>
                        <div className="data-container">
                            {
                                !filter.trim().length > 0 ?
                                    friends && friends.length > 0 ?
                                        friends.map(friend => {
                                            return (
                                                <AddUserMapDisplay friend={friend} selected={selected} modifyCheck={modifyCheck} />
                                            )
                                        })
                                    : <h1 className="null-header">No friends left to choose from.</h1>
                                : 
                                    filtered && filtered.length > 0 ? 
                                        filtered.map(friend => {
                                            return (
                                                <AddUserMapDisplay friend={friend} selected={selected} modifyCheck={modifyCheck} />
                                            )
                                        })
                                        : <h1>No friends left to choose from.</h1>
                                    
                            }
                        </div>
                    </div>
                    {/* Selected User */}
                    <div className="current-users">
                        <h1>Selected User:</h1>
                        {
                            selectedUser ?
                                <div className="user-badge newSelect">
                                    <span>{selectedUser.username}</span>
                                    <span> #{selectedUser.idCode}</span>
                                </div> :
                                ""
                        }
                    </div>
                    {/* Content */}
                    <form className="create-conversation-content">
                        <label htmlFor="content">Message Content:</label>
                        <textarea className="form-control" id="content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                    </form>
                </ModalBody>
                <ModalFooter>
                        <div className="modal-buttons">
                            <button onClick={() => closeModal()}>Cancel</button>
                            <button type="submit" onClick={(e) => sendMessage(e, selected, content)}>Send</button>
                        </div>
                </ModalFooter>
            </Modal>
        </div>
    )
}