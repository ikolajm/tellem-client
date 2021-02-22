import axios from "axios";
import APIURL from "../../../environment/apirouter";

export default async () => {
    let url = `${APIURL}/friends/all`
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
    
    if (request.status === "SUCCESS") return request.friends
}