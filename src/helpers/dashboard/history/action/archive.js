import rootTarget from "../../../events/button-rootTarget";
import APIURL from "../../../environment/apirouter";
import {toast} from "react-toastify";

export default async (e, conversation) => {
    let target = await rootTarget(e);
    let parentItem = target.parentNode.parentNode;
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
        parentItem.remove();
        toast.success("Conversation archived")
    } else {
        toast.error("Conversation could not be archived at this time")
    }
}