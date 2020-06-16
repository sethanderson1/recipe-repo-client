import React from 'react';
import { Route, Link } from 'react-router-dom';
import './MainNav.css'

function MainNav() {

    return (
        <nav className="MainNav__nav">
            {/* todo: find cooking logo to use as link */}
            <Link to={'/'}>Recipe Repo</Link>
            <Link to={'/signup'}>SignUp</Link>
            <Link to={'/login'}>Login</Link>
            <Link to={'/categories'}>Demo</Link>
        </nav>

    )
}

export default MainNav;