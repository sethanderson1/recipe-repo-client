import React from 'react';
// import { Route, Link } from 'react-router-dom';
import MainNav from '../MainNav/MainNav';
import './LandingPage.css';
import recipe_repo_logo from './../images/recipe_repo_logo.png';


function LandingPage() {
    return (
        <div className='LandingPage-container '>
            <header
                className='LandingPage-nav
             default-primary-color'>
                <MainNav />
            </header>
            <section className='LandingPage-main-container'>
                {/* <div className='logo-wrapper'> */}
                    <img src={recipe_repo_logo} alt='Recipe Repo Logo' className='LandingPage-logo' />
                {/* </div> */}

                <h2>Info about the app</h2>
                <p>description of app here</p>
                <h2>Screenshots</h2>
                <p>cool screenshots and maybe animated gif of site in action</p>
            </section>
        </div>
    )
}

export default LandingPage;