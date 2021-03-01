import rootTarget from "../../../events/button-rootTarget";
import axios from "axios"; 
import APIURL from "../../../environment/apirouter";
import { toast } from "react-toastify";

export default async  (e, uuid) => {
    let target = await rootTarget(e);
    console.log(target, target.nextSibling)
    let request = await axios.post(
        `${APIURL}/friends/request/create/${uuid}`,
        {
            // Not needed
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
        toast.success("Friend request sent successfully")
        target.classList.remove("visible");
        target.nextSibling.classList.add("visible");
    }
}