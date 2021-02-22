import axios from "axios";
import APIURL from "../../../environment/apirouter";

const visible = async () => {
    let url = `${APIURL}/history/archived`
    let request = await axios.get(
        url,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("token")
            }
        }
    )
    request = request.data
    
    if (request.status === "SUCCESS") return request.conversations
}

export default visible