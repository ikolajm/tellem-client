import { toast } from 'react-toastify';
import { Redirect } from "react-router-dom";

export default setUser => {
    sessionStorage.removeItem("token");
    setUser(null)
    toast.success("Logout successful");
    return <Redirect to="/" />
}