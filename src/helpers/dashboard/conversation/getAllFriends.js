import { toast } from "react-toastify";
import APIURL from "../../environment/apirouter";
import axios from "axios";

export default async (users, id) => {
    let request = await axios.get(
        `${APIURL}/friends/all`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("token")
            }
        }
    )
    request = request.data
    // console.log(request)
    if (request.status === "SUCCESS") {
        // toast.success("User added successfully!")
        return request.friends
    }
}