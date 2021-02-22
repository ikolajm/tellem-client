import React, { useEffect, useState, Fragment } from "react";
import Loading from "../../loading/Loading";
import ConversationNavbar from "../contextual navbars/ConversationNavbar";
import { useParams } from "react-router-dom"
import APIURL from "../../../helpers/environment/apirouter";
import axios from "axios";

export default ({user}) => {
    const [conversation, setConversation] = useState()
    const [loading, setLoading] = useState(true)

    let { id } = useParams();
    const fetchData = async () => {
        let url = `${APIURL}/conversation/${id}`;
        let request = await axios.get(
            url,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": sessionStorage.getItem("token")
                }
            }
        )
        request = request.data;
        return request.conversation;
    }

    useEffect(async () => {
        let data = await fetchData();
        console.log(data)
        setConversation(data)
        setLoading(false)
    }, [])

    return (
        <Fragment>
            {
                loading ?
                    <Loading text="Redirecting to conversation..." /> :
                    <Fragment>
                        {/* Conversation Header */}
                        <ConversationNavbar user={user} data={conversation} setConversation={setConversation} />
                        {/* Conversation Display */}
                        <div className="conversation">
                            <div>
                            </div>
                        </div>
                    </Fragment>
            }
        </Fragment>
    )
}