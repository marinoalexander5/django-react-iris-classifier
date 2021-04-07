import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";
import PasswordUpdate from "./components/PasswordUpdate";


// Redirect to login page if user is not authenticated
function PrivateRoute({ isAuthenticated, children, ...rest }) {
    return(
        <Route
            {...rest}
            render={({ location }) => 
            isAuthenticated ? (children) : (
                <Redirect to={{ 
                    pathname: "/login/",
                    state: { from: location }
                }} />
            )
        } />
    );
}

function Urls(props) {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login/"><Login {...props} /></Route>
                    <PrivateRoute exact path="/" isAuthenticated={props.isAuthenticated}><Home {...props}></Home></PrivateRoute>
                    <PrivateRoute exact path="/update_password/" isAuthenticated={props.isAuthenticated}><PasswordUpdate {...props}/> </PrivateRoute>
                </Switch>
            </BrowserRouter>
        </div>
    )
};

export default Urls;