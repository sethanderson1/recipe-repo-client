import React, { useContext, useState } from 'react'
import './SignUp.css';
import config from '../config'
import RecipesContext from '../RecipesContext'




export default function SignUp(props) {
    // const [error, setError] = useState(null)
    const context = useContext(RecipesContext)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    function handleCancel() {
        props.history.push(`/`)
    }

    const handleSubmit = e => {
        e.preventDefault()
        const { user_name, password } = e.target;

        postSignUpUser({
            user_name: user_name.value,
            password: password.value,
        })
    }

    function postSignUpUser(credentials) {

        return fetch(`${config.API_ENDPOINT}/users`, {
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
            .then((res) => {
                props.history.push('/login')
            })
            .catch(err => {


                console.log('err', err)
            })
    }
    return (
        <div className='SignUp__signup-form-container'>
            <form
                onSubmit={handleSubmit}
                className='SignUp__signup-form'>
                <div>
                    <label htmlFor="user_name">Username: </label>
                    <input placeholder='username' type="text"
                        name='user_name' id='user_name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input placeholder='password' type="password"
                        name='password' id='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required />
                </div>
                <div>
                    <label htmlFor="confirm_password">Password: </label>
                    <input placeholder='password' type="password"
                        name='confirm_password' id='confirm_password'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required />
                </div>
                <button
                    type="button"
                    onClick={handleCancel}>Cancel</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
