import React, { useEffect, useState, Fragment } from "react";
import checkRoute from "../../../helpers/checks/route";
import All from "./All"
import Pending from "./Pending"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import getFriendIDs from "../../../helpers/dashboard/friends/load/getFriendIds";
import SearchResults from "./SearchResults";
import userSearch from "../../../helpers/dashboard/friends/action/userSearch";

export default ({user}) => {
    const [route, setRoute] = useState("ALL");
    const [modal, setModal] = useState(false);
    const [username, setUsername] = useState("")
    const [number, setID] = useState("");
    const [data, setData] = useState(null);
    
    const closeModal = () => {
        setUsername("");
        setID("");
        setData(null)
        setModal(false);
    }

    const searchUsers = async (username, number) => {
        let newData = await userSearch(username, number);
        if (newData.status === "SUCCESS") {
            setData(newData)
        }
    }
    
    const routeSwitch = route => {
        if (route === "ALL") {
            return <All user={user} />
        }
        return <Pending user={user} />
    }

    return (
        <div className="friends container">
            {/* Routes */}
            <div className="route-container">
                <button className={checkRoute(route, "ALL")} onClick={() => setRoute("ALL")}>All</button>
                <button className={checkRoute(route, "PENDING")} onClick={() => setRoute("PENDING")}>Pending</button>
                <button className="success" onClick={() => setModal(true)}>Add Friend</button>
            </div>
            {/* Display */}
            <div className="route-display">
                {/* History Routing */}
                {routeSwitch(route)}
            </div>

            {/* Send Friend Request Modal */}
            <Modal isOpen={modal} toggle={() => closeModal()}>
                <ModalHeader>
                    <h1>Send Friend Request</h1>
                </ModalHeader>
                <ModalBody>
                    <div className="friend-search">
                        <div className="input">
                            <label htmlFor="username">Username:</label>
                            <input className="form-control" id="username" type="string" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="input">
                            <label htmlFor="id">ID:</label>
                            <input id="id" className="form-control" type="number" value={number} onChange={(e) => setID(e.target.value)} />
                        </div>
                        <button className="search" onClick={() => searchUsers(username, number)}>Search</button>
                    </div>
                    <div className="search-results">
                        {
                            data && data.users.length > 0 ?
                                <div className="data-container">
                                    <SearchResults user={user} data={data} />
                                </div>
                                : <h1 className="null-header">No Results to be found</h1>
                        }
                    </div>
                </ModalBody>
                <ModalFooter>
                        <div className="modal-buttons">
                            <button className="grey" onClick={() => closeModal()}>Close</button>
                        </div>
                </ModalFooter>
            </Modal>
        </div>
    )
}