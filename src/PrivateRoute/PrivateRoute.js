import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ children, ...rest }) {
    const authToken = localStorage.getItem('authToken')
    const loggedInStatus = authToken ? true : false
    return (
        <Route
            {...rest}
            render={() => 
                // if is logged on
                loggedInStatus
                ? (children)
                : (<Redirect to={'/'} />)
            }
        />
    );
}