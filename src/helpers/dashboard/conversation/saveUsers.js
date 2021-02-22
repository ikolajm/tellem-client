import { toast } from "react-toastify";
import APIURL from "../../environment/apirouter";
import axios from "axios";

export default async (userIds, conversationId) => {
    let request = await axios.post(
        `${APIURL}/conversation/add/user/${conversationId}`,
        {
            userIds
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
        toast.success("User added successfully!")
        return request.users
    }
}