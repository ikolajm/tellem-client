import React, { useState, Fragment, useEffect } from "react";
import checkRoute from "../../../helpers/checks/route";
import All from "./All"
import Archived from "./Archived"
import Visible from "./Visible"
import SendMessage from "./modals/SendMessage";
import APIURL from "../../../helpers/environment/apirouter";
import axios from "axios";
import { Redirect } from "react-router-dom";
import getAllFriends from "../../../helpers/dashboard/friends/load/all";

export default ({user}) => {
    const [route, setRoute] = useState("VISIBLE");
    const [modal, setModal] = useState(false)
    const [friends, setFriends] = useState(null)
    const [redirect, setRedirect] = useState(null)

    useEffect(async () => {
        let friends = await getAllFriends(user)
        friends = friends.filter(friend => user.id !== friend.id)
        setFriends(friends)
    }, [])

    const createConversation = async (e, friendId, content) => {
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
        if (request.status === "SUCCESS") {
            let conversationURL =  `/dashboard/conversation/${request.conversationId}`
            setRedirect(conversationURL)
        }
    }

    const routeSwitch = route => {
        switch (route) {
            case "VISIBLE":
                return <Visible user={user} />
            case "ARCHIVED":
                return <Archived user={user} />
            default:
                return <All user={user} />
        }
    }

    return (
        <div className="history container">
            {
                redirect ?
                    <Redirect to={redirect} /> :
                    <Fragment>
                        <div className="route-container">
                            <button className={checkRoute(route, "VISIBLE")} onClick={() => setRoute("VISIBLE")}>Visible</button>
                            <button className={checkRoute(route, "ARCHIVED")} onClick={() => setRoute("ARCHIVED")}>Archive</button>
                            <button className={checkRoute(route, "ALL")} onClick={() => setRoute("ALL")}>All</button>
                            <button className="success" onClick={() => setModal(true)}>Send Message</button>
                        </div>
                        {/* Display */}
                        <div className="route-display">
                            {/* History Routing */}
                            {routeSwitch(route)}
                        </div>
                        {/* Send Message Modal */}
                        <SendMessage user={user} open={modal} setModal={setModal} friends={friends} createConversation={createConversation} />
                    </Fragment>
            }
        </div>
    )
}