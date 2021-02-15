import axios from "axios";
import APIURL from "../environment/apirouter";
import { toast } from 'react-toastify';

export default async (firstName, lastName, username, email, password, confirm, setUser) => {
    firstName = firstName.trim();
    lastName = lastName.trim();
    username = username.trim();
    email = email.trim();
    password = password.trim();
    confirm = confirm.trim();

    if (
        firstName === "" ||
        lastName === "" ||
        username === "" ||
        email === "" ||
        password === "" ||
        confirm === ""
    ) {
        return toast.error("Please ensure all fields are filled in!")
    }

    if (password !== confirm) return toast.error("Please make sure the password fields match!")

    let request = await axios.post(
        // URL
        `${APIURL}/user/create`, 
        // BODY
        {
            firstName,
            lastName,
            username,
            email, 
            password,
            confirm 
        },
        // HEADERS
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    request = request.data
    
    if (request.status === "ERROR") return toast.error(request.message + "!")

    // On success - set the user to the logged in account and set a session token
    toast.success("Successfully signed up!");
    setTimeout(() => {
        sessionStorage.setItem("token", request.sessionToken)
        setUser(request.user)
    }, 500)
}