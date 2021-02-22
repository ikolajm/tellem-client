import React, { useState, useEffect } from "react";
import LoadingSmall from "../../loading/LoadingSmall";
import pendingLoad from "../../../helpers/dashboard/friends/load/pending";
import Incoming from "./Incoming";
import Outgoing from "./Outgoing";

export default ({user}) => {
    const [data, setData] = useState(null)

    useEffect(async () => {
        let response = await pendingLoad();
        setData({
            incoming: response.incoming,
            outgoing: response.outgoing
        })
    }, [])
    
    return (
        <div>
            {
                !data ?
                    <LoadingSmall text="Gathering requests..." /> :
                    <div className="data-container">
                        <Incoming data={data.incoming} />
                        {/* Outgoing */}
                        <Outgoing data={data.outgoing} />
                    </div>
            }
        </div>
    )
}