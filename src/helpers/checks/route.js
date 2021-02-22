const checkRoute = (stateRoute, routeName) => {
    return stateRoute === routeName ? "active-route" : "";
}

export default checkRoute