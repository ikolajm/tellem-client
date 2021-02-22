import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { TiGroup } from "react-icons/ti";
import { FaEdit, FaUserFriends } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import EditConversationModal from "../conversation/modals/EditConversationModal";
import ViewUserModal from "../conversation/modals/ViewUserModal";

export default ({user, data, setConversation}) => {
    console.log(data)
    let userList = data.users.filter(u => u.uuid !== user.uuid)
    userList = userList.map(u => u.username)
    const [editModal, setEditModal] = useState(false);
    const [userModal, setUserModal] = useState(false);
    return (
        <div className="dashboard-navigation conversation-nav">
            <button className="back"><Link to="/dashboard/history"><IoMdArrowBack /> Go Back</Link></button>
            {/* Conversation name */}
            <div className="information">
                {
                    // If group message
                    data.users.length > 2 ?
                        <Fragment>
                            <span><TiGroup /></span>
                            <h1>
                            {
                                data.conversation.name && data.conversation.name.trim() !== "" ?
                                    data.conversation.name :
                                    // If logged in user is considered for avatar snippet
                                    userList.map((username, i) => {
                                        return i !== userList.length - 1 ? username + ", " : username
                                    })
                            }
                            </h1>
                        </Fragment>
                            :
                        // Does the conversation have a name
                        data.conversation.name && data.conversation.name.trim() !== "" ?
                            data.conversation.name :
                            // If logged in user is considered for avatar snippet
                            data.users[0].id === user.id ?
                                data.users[1].username :
                                data.users[0].username

                }
            </div>
            {/* Options dropdown */}
            <div class="custom-tooltip">
                <IoMdArrowDropdown />
                <span class="tooltip-inner">
                    <span onClick={() => setEditModal(true)}>Edit Name <FaEdit /></span>
                    <span onClick={() => setUserModal(true)}>View Users <FaUserFriends /></span>
                </span>
            </div>
            {/* Edit Conversation Info */}
            <EditConversationModal open={editModal} setModal={setEditModal} data={data} setConversation={setConversation} />
            {/* View Users Info */}
            <ViewUserModal user={user} open={userModal} setModal={setUserModal} data={data} setConversation={setConversation} />
        </div>
    )
}