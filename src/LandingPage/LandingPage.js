import React from 'react';
import { Route, Link } from 'react-router-dom';
import MainNav from '../MainNav/MainNav';

function LandingPage() {
    return (
        <div>
            <header>
                <MainNav />
            </header>
            <h2>Info about the app</h2>
            <p>blah blah its a good app heres what it does</p>
            <h2>Screenshots</h2>
            <p>cool screenshots and maybe animated gif of site in action</p>
        </div>
    )
}

export default LandingPage;