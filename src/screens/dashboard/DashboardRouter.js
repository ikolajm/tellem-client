import React, { useEffect } from "react";
import checkToken from "../../helpers/authentication/checkToken";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Header from "../dashboard/Header";
import History from "../dashboard/history/History";
import Friends from "../dashboard/friends/Friends";
import Conversation from "../dashboard/conversation/Conversation";
import Profile from "../dashboard/profile/Profile";
import Loading from "../loading/Loading";
import MainDashboardDirectory from "./contextual navbars/MainDashboardDirectory";

export default ({user, setUser}) => {
    let history = useHistory();
    useEffect(async () => {
        const token = sessionStorage.getItem("token");
        let tokenCheck = await checkToken(token, user, setUser);
        if (tokenCheck === "FAIL") {
            history.push("/authentication/login")
        }
    })
    return (
        <div className="dashboard">
            {!user ?
                // Escape hatch to allow for persistant logins and efficient rerouting on incorrect urls
                <Loading text="Redirecting you to your dashboard..." />
            :
                <div>
                    <Header user={user} />
                    <Switch>
                        {/* History */}
                        <Route path={`/dashboard/history`}>
                            <MainDashboardDirectory />
                            <History user={user} />
                        </Route>
                        {/* Friends */}
                        <Route path={`/dashboard/friends`}>
                            <MainDashboardDirectory />
                            <Friends user={user} />
                        </Route>
                        {/* Conversation */}
                        <Route exact path={`/dashboard/conversation/:id`}>
                            <Conversation user={user} />
                        </Route>
                        {/* Profile */}
                        <Route exact path={`/dashboard/profile`}>
                            <Profile user={user} setUser={setUser} />
                        </Route>
                        {/* Default */}
                        <Route 
                            path={`/*`}
                            render={() => <Redirect to="/dashboard/history" /> }
                        />
                    </Switch>
                </div>
            }
        </div>
    );
}
