import React, { useContext } from 'react'
import { Route, Link } from 'react-router-dom';
import './MainNav.css'
import RecipesContext from '../RecipesContext';


function MainNav() {
    const context = useContext(RecipesContext)

    function renderLogInOrOut() {
        if (!context.isLoggedIn) {
            return (
                <Link to={'/login'}>Login</Link>
            )
        } else {
            return (
                <Link 
                onClick={context.handleLogout}
                to={'/'}>Logout</Link>
            )
        }
    }



    return (
        <nav className="MainNav__nav">
            {/* todo: find cooking logo to use as link */}
            <Link to={'/'}>Recipe Repo</Link>
            <Link to={'/signup'}>SignUp</Link>
            {renderLogInOrOut()}
            <Link to={'/categories'}>Demo</Link>
        </nav>
    )
}

export default MainNav;