import axios from "axios";
import APIURL from "../environment/apirouter";

export default async token => {
    if (!token) return "FAIL";

    let request = await axios.post(
        // URL
        `${APIURL}/user/authenticate`, 
        // BODY
        { token },
        // HEADERS
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    request = await request.data
    if (request.status === "ERROR") return "FAIL";

    return request.user;
}