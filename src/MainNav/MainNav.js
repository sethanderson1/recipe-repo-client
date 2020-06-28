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
                <div className='last-two-wrapper'>
                    <Link className='nav-link text-primary-color'

                        to={'/signup'}>SignUp</Link>
                    <Link className='nav-link text-primary-color'

                        to={'/login'}>Login</Link>
                </div>
            )
        } else {
            return (
                <div className='last-two-wrapper'>
                    <Link
                        className='nav-link text-primary-color'
                        to={'/categories'}>My Recipes</Link>
                    <Link
                        className='nav-link text-primary-color'

                        onClick={context.handleLogout}
                        to={'/'}>Logout</Link>
                </div>
            )
        }
    }



    return (
        <nav className="MainNav__nav">
            {/* todo: find cooking logo to use as link */}
            <Link
                    className='text-primary-color'

                to={'/'}>
                    Recipe Repo
                </Link>
            {renderLogInOrOut()}
        </nav>
    )
}

export default MainNav;