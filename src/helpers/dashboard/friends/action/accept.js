import rootTarget from "../../../events/button-rootTarget";
import axios from "axios"; 
import APIURL from "../../../environment/apirouter";

export default async  (e, request) => {
    let target = await rootTarget(e);
    let buttonNav = target.parentNode;
    let friendId = request.user.id;
    let friendUuid = request.user.uuid
    let axiosRequest = await axios.post(
        `${APIURL}/friends/request/accept/${request.uuid}`,
        {
            friendId, friendUuid
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("token")
            }
        }
    )
    axiosRequest = axiosRequest.data
    if (axiosRequest.status === "STATUS") {
        buttonNav.innerHTML = ""
        buttonNav.insertAdjacentHTML("afterend",
        "<button>Accepted ✔</div>")
    }
}