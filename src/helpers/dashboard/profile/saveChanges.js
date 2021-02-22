import { toast } from "react-toastify";
import { blankInputs, matchingPasswords } from "../../checks/inputs";
import APIURL from "../../environment/apirouter";
import axios from "axios";

export default async (e, user, setUser, username, idCode, statusMessage, firstName, lastName, email, password, confirmPassword) => {
    e.preventDefault()
    let requiredInputs = [firstName, lastName, email, username, idCode.toString()];
    let passwords = [password, confirmPassword];

    const allFilled = await blankInputs(requiredInputs)
    if (!allFilled) {
        return toast.error("Please ensure all required fields are filled");
    }

    if (password.trim() !== "" || confirmPassword.trim() !== "") {
        const matching = await matchingPasswords(passwords);
        if (!matching) {
            return toast.error("Password fields don't match, if you aren't changing your password, make sure the inputs are blank to continue");
        }
    }

    if (idCode.toString().length < 5) {
        return toast.error("Identifier code must be 5 digits");
    }

    if (username.length < 3) {
        return toast.error("Username must be at least 3 characters");
    }

    let request = await axios.put(
        `${APIURL}/user/update/${user.uuid}`,
        {
            firstName,
            lastName,
            email,
            password,
            username,
            statusMessage,
            idCode,
            avatarURL: "",
            background: user.background
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("token")
            }
        }
    )
    request = request.data
    if (request.status === "SUCCESS") {
        toast.success("Profile updated successfully!")
        setTimeout(() => {
            setUser(request.user)
        }, 300)
    }
}