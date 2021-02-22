import rootTarget from "../../../events/button-rootTarget";
import APIURL from "../../../environment/apirouter";
import {toast} from "react-toastify";

export default async (e, conversation) => {
    let target = rootTarget(e);
    let parentItem = target.parentNode.parentNode;
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
        parentItem.remove();
        toast.success("Conversation unarchived")
    } else {
        toast.error("Conversation could not be unarchived at this time")
    }
}