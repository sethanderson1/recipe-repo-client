import React, { useContext, useState } from 'react'
import RecipesContext from '../RecipesContext'
import './Login.css';
import config from '../config'
// import config from './'

export default function SignUp(props) {
    const [error, setError] = useState(null)
    const context = useContext(RecipesContext)

    function handleCancel() {
        props.history.push(`/`)
    }

    const handleSubmit = e => {
        e.preventDefault()
        const { user_name, password } = e.target;

        postLoginUser({
            user_name: user_name.value,
            password: password.value,
        })
    }

    function postLoginUser(credentials) {
        // todo: change to config....
        // return fetch(`${config.API_ENDPOINT}/auth/login`, {
        return fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(credentials),
        })
            .then((res) => {
                return !res.ok
                    ? res.json().then((e) => Promise.reject(e))
                    : res.json();
            })
            .then(async (res) => {
                const { authToken } = res
                await storeToken(authToken)
                await context.handleGetCategories()
                await context.handleGetRecipes()
                props.history.push('/categories')
            })
            .catch(err => {
                setError(
                    <div className="login-error">
                        Incorrect username or password</div>
                )
                console.log('err', err)
            })
    }


    async function storeToken(authToken) {
        await localStorage.setItem('authToken', authToken);
        context.handleChangeIsLoggedIn(true)
    }

    return (
        <div className='SignUp__signup-form-container'>
            <form className='login-form' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="user_name">Username: </label>
                    <input placeholder='username' type="text"
                        name='user_name' id='user_name' required />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input placeholder='password' type="password"
                        name='password' id='password' required />
                </div>
                {error}
                <button type='button' onClick={handleCancel}>Cancel</button>
                <button type='submit'>Log In</button>
            </form>
        </div>
    )
}
