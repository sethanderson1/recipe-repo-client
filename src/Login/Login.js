import React from 'react';
import './Login.css';
import config from '../config'
// import config from './'

export default function SignUp(props) {

    function handleCancel() {
        props.history.push(`/`)
    }

    const handleSubmit = e => {
        e.preventDefault()
        // todo: i have to set error to null?
        const { user_name, password } = e.target;
        // console.log('user_name.value', user_name.value)
        // console.log('password.value', password.value)

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
            .then(res => {
                const { authToken } = res
                storeToken(authToken)
                props.history.push('/categories')
            })
            .catch(err => {
                // todo: show error on page
                console.log('err', err)
            })
    }

    function storeToken(authToken) {
        localStorage.setItem('authToken', authToken);
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
                <button type='button' onClick={handleCancel}>Cancel</button>
                <button type='submit'>Log In</button>
            </form>
        </div>
    )
}
