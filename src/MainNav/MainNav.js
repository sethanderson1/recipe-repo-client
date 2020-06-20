import React, { useContext } from 'react'
import { Route, Link } from 'react-router-dom';
import './MainNav.css'
import RecipesContext from '../RecipesContext';


function MainNav() {
    const context = useContext(RecipesContext)

    function renderLogInOrOut() {
        const authToken = localStorage.getItem('authToken')
        const loggedInStatus = authToken ? true : false

        if (!loggedInStatus) {
            return (
                <>
                    <Link to={'/signup'}>SignUp</Link>
                    <Link to={'/login'}>Login</Link>
                </>
            )
        } else {
            return (
                <>
                    <Link to={'/categories'}>My Recipes</Link>
                    <Link
                        onClick={context.handleLogout}
                        to={'/'}>Logout</Link>
                </>
            )
        }
    }



    return (
        <nav className="MainNav__nav">
            {/* todo: find cooking logo to use as link */}
            <Link to={'/'}>Recipe Repo</Link>
            {renderLogInOrOut()}
        </nav>
    )
}

export default MainNav;