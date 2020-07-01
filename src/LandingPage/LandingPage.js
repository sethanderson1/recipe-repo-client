import React, { useContext } from 'react';
import MainNav from '../MainNav/MainNav';
import RecipesContext from '../RecipesContext';
import recipe_repo_logo from './../images/recipe_repo_logo2.png';
import './LandingPage.css';

function LandingPage(props) {
    const context = useContext(RecipesContext);
    async function handleClickSignUp() {
        await context.handleLogout();
        props.history.push('/signup');
    };

    async function handleClickLogin() {
        await context.handleLogout();
        props.history.push('/login');
    };

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
                    Sign up <span onClick={handleClickSignUp}>here</span> or try out the demo <span onClick={handleClickLogin}>here</span> to get started!
                </p>
            </div>
        </section>
    );
};

export default LandingPage;