import rootTarget from "../../../events/button-rootTarget";
import axios from "axios"; 
import APIURL from "../../../environment/apirouter";
import { toast } from "react-toastify";

export default async  (username, id) => {
    if (username.trim() === "" || username.trim().length < 3) {
        return toast.error("Please make sure username has a value and is at least 3 characters")
    }
    if (id.length !== 5) {
        return toast.error("Please make sure your id code has a value and is 5 numbers long")
    }

    let data = await axios.post(
        `${APIURL}/user/search`,
        {
            username, id
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("token")
            }
        }
    )
    data = data.data
    if (data.status === "SUCCESS") {
        return data
    }
}