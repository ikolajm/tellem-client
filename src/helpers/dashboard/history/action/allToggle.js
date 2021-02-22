import rootTarget from "../../../events/button-rootTarget";
import APIURL from "../../../environment/apirouter";
import {toast} from "react-toastify";

export default async (e, conversation, action) => {
    if (action === "ARCHIVE") {
        let target = await rootTarget(e);
        const url = `${APIURL}/history/archive/${conversation.id}`;
        let results = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("token")
            }
        })
        results = await results.json()
        if (results.status === "SUCCESS") {
            // Toggle classes
            target.classList.remove("visible")
            target.nextSibling.classList.add("visible")
            toast.success("Conversation archived")
        } else {
            toast.error("Conversation could not be archived at this time")
        }
    }

    if (action === "UNARCHIVE") {
        let target = rootTarget(e);
        const url = `${APIURL}/history/unarchive/${conversation.id}`;
        let results = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("token")
            }
        })
        results = await results.json()
        if (results.status === "SUCCESS") {
            target.classList.remove("visible")
            target.previousSibling.classList.add("visible")
            toast.success("Conversation unarchived")
        } else {
            toast.error("Conversation could not be unarchived at this time")
        }
    }
}