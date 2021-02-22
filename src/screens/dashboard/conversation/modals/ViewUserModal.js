import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import saveUserChange from "../../../../helpers/dashboard/conversation/saveUsers";
import getAllFriends from "../../../../helpers/dashboard/conversation/getAllFriends";
import AddUserMapDisplay from "./AddUserMapDisplay";
import { toast } from "react-toastify";

export default ({user, open, setModal, data, setConversation}) => {
    const [filter, setFilter] = useState("")
    const [filtered, setFiltered] = useState([])
    const [friends, setFriends] = useState([])
    const [selected, setSelected] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    useEffect(async () => {
        let friends = await getAllFriends(user)
        friends = friends.filter(friend => !data.users.includes(friend))
        let userIds = data.users.map(user => user.id)
        userIds = userIds.filter(id => id !== user.id)
        friends = friends.filter(friend => !userIds.includes(friend.id))
        setFriends(friends)
    }, [])

    const saveChanges = async () => {
        if (selected.length === 0) {
            return setModal(false)
        }
        let newUsers = await saveUserChange(selected, data.conversation.id)
        console.log(newUsers)
        let obj = {...data}
        console.log(obj)
        obj.users = obj.users.concat(newUsers)
        console.log(obj)
        setConversation(obj)
        closeModal()
    }

    const filterFriends = (string) => {
        let copy = [...friends]
        let filteredFriends = copy.filter(friend => friend.username.toLowerCase().includes(string))
        setFilter(string)
        setFiltered(filteredFriends)
    }

    const modifyCheck = (id) => {
        if (selectedUsers.length >= 5) {
            return toast.error("You can have a max of 5 users in a conversation")
        }
        let idArr = [...selected]
        let userArr = [...selectedUsers]
        if (selected.includes(id)) {
            idArr = idArr.filter(i => i !== id)
            userArr = userArr.filter(user => user.id !== id)
        } else {
            idArr.push(id)
            let friend = friends.filter(friend => friend.id === id)
            friend = friend[0]
            userArr.push(friend)
        }
        setSelected(idArr)
        setSelectedUsers(userArr)
    }

    const closeModal = () => {
        setFilter("")
        setSelected([])
        setSelectedUsers([])
        setModal(false)
    }
    return (
        <div >
            <Modal className="view-user-modal" isOpen={open} toggle={() => setModal(false)}>
                <ModalHeader>
                    <h1>User Details</h1>
                </ModalHeader>
                <ModalBody>
                    <h1>Add users to conversation:</h1>
                    {/* Friendslist to quick add users from */}
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
                    {/* Users in chat */}
                    <div className="current-users">
                        <h1>Users in chat:</h1>
                        {
                            data.users.map(user => {
                                return (
                                    <div className="user-badge">
                                        <span>{user.username}</span>
                                        <span> #{user.idCode}</span>
                                    </div>
                                )
                            })
                        }
                        {
                            selectedUsers.map(user => {
                                return (
                                    <div className="user-badge newSelect">
                                        <span>{user.username}</span>
                                        <span> #{user.idCode}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </ModalBody>
                <ModalFooter>
                        <div className="modal-buttons">
                            <button onClick={() => closeModal()}>Cancel</button>
                            <button type="submit" onClick={() => saveChanges()}>Save</button>
                        </div>
                </ModalFooter>
            </Modal>
        </div>
    )
}