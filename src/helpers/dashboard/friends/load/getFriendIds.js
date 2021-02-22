import axios from "axios"
import APIURL from "../../../environment/apirouter";

export default async () => {
    let request = await axios.get(
        `${APIURL}/friends/all/id`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("token")
            }
        }
    )
    request = await request.data
    return request.friends;
}