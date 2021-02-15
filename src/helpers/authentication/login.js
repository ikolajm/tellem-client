import axios from "axios";
import APIURL from "../environment/apirouter";
import { toast } from 'react-toastify';

export default async (e, email, password, setUser) => {
    e.preventDefault();
    email = email.trim();
    password = password.trim();

    if (email === "" || password === "") {
        return toast.error("Please ensure both fields are filled in!")
    }

    let request = await axios.post(
        // URL
        `${APIURL}/user/signin`, 
        // BODY
        { email, password },
        // HEADERS
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    request = request.data
    
    if (request.status === "ERROR") {
        return toast.error(request.message + "!")
    }

    // On success - set the user to the logged in account and set a session token
    toast.success("Successfully logged in!");
    setTimeout(() => {
        sessionStorage.setItem("token", request.sessionToken)
        setUser(request.user)
    }, 500)
}