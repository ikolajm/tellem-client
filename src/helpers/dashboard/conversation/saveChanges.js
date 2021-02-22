import { toast } from "react-toastify";
import APIURL from "../../environment/apirouter";
import axios from "axios";

export default async (name, id) => {
    let request = await axios.put(
        `${APIURL}/conversation/update/${id}`,
        {
            name
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("token")
            }
        }
    )
    request = request.data
    console.log(request)
    if (request.status === "SUCCESS") {
        toast.success("Conversation updated successfully!")
        return request.conversationEdit
    }
}