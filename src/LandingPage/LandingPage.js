import React from 'react';
// import { Route, Link } from 'react-router-dom';
import MainNav from '../MainNav/MainNav';
import './LandingPage.css';
import recipe_repo_logo from './../images/recipe_repo_logo2.png';
import { Link } from 'react-router-dom';


function LandingPage() {
    return (
        <section className='LandingPage-container '>
            <header
                className='LandingPage-nav
             default-primary-color'>
                <MainNav />
            </header>
            <div className='LandingPage-main-container'>
                <h1 className='LandingPage-app-title'>
                    Recipe Repo
                </h1>
                    <img src={recipe_repo_logo} alt='Recipe Repo Logo' className='LandingPage-logo' />
                <h2>About Recipe Repo</h2>
                <p className='app-description-content'>
                    
                Use Recipe Repo to store your recipes and organize them by category


                </p>
                <h2>Get Started</h2>
                <p className='get-started-content primary-text-color'>
                   
                    Sign up <span><Link to={'/signup'}>here</Link></span> or try out the demo <span><Link to={'/login'}>here</Link></span> to get started!
                </p>
            </div>
        </section>
    )
}

export default LandingPage;