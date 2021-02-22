import reauthentication from "./reauthentication";
import { toast } from 'react-toastify';
import { Redirect } from "react-router-dom";

export default async (token, user, setUser) => {
    // If session is still in place and user refreshes
    if (token && !user) {
        let response = await reauthentication(token);
        // If auth fails or expires
        if (response === "FAIL") {
            sessionStorage.removeItem("token");
            toast.error(response.message);
            return "FAIL"
        }
        let userObj = await response
        setUser(userObj)
    }
    // If a protected endpoint is hit but there is no token
    if (!token) {
        return "FAIL"
    } 
}