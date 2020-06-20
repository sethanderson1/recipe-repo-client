import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import RecipesContext from '../RecipesContext'


export default function PrivateRoute({ children, ...rest }) {
    // const context = useContext(RecipesContext)
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