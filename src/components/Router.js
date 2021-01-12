import React from "react";
import {HashRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Navigation from "./Navigation";
import Profile from "../routes/Profile";

const AppRouter = ({isLoggedIn, user}) => {
    return (
        <Router>
            { isLoggedIn && <Navigation/>}
            <Switch>
                {
                    isLoggedIn ? (
                        <>
                            <Route exact path="/">
                                <Home user={user}/>
                            </Route> 
                            <Route exact path="/profile">
                                <Profile />
                            </Route> 
                        </>
                    ) : (
                        <>
                            <Route exact path="/">
                                <Auth />
                            </Route>
                            <Redirect from="*" to="/"/>
                        </>
                    )
                }
            </Switch>
        </Router>
    )
}

export default AppRouter;