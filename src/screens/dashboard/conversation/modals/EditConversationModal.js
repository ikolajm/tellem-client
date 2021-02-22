import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import saveInfoChange from "../../../../helpers/dashboard/conversation/saveChanges";

export default ({open, setModal, data, setConversation}) => {
    const [name, setName] = useState(data.conversation.name)

    const saveChanges = async () => {
        let request = await saveInfoChange(name, data.conversation.id)
        let obj = {...data}
        obj.conversation = request
        setConversation(obj)
        setModal(false)
    }

    return (
        <div>
            <Modal isOpen={open} toggle={() => setModal(false)}>
                <ModalHeader>
                    <h1>Edit Details</h1>
                </ModalHeader>
                <ModalBody>
                    <form>
                        <label htmlFor="name">Name:</label>
                        <input className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                    </form>
                </ModalBody>
                <ModalFooter>
                        <div className="modal-buttons">
                            <button onClick={() => setModal(false)}>Cancel</button>
                            <button type="submit" onClick={() => saveChanges()}>Save</button>
                        </div>
                </ModalFooter>
            </Modal>
        </div>
    )
}