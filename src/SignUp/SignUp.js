import React, { useContext, useState } from 'react'
import './SignUp.css';
import config from '../config'
import RecipesContext from '../RecipesContext'
import ValidationError from '../ValidationError/ValidationError';

export default function SignUp(props) {
    // const [error, setError] = useState(null)
    const context = useContext(RecipesContext)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [touched, setTouched] = useState(false)

    function handleCancel() {
        props.history.push(`/`)
    }

    const handleSubmit = e => {
        e.preventDefault()
        postSignUpUser({
            user_name: name,
            password,
        })
    }

    function postSignUpUser(signUpFields) {
        return fetch(`${config.API_ENDPOINT}/users`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(signUpFields),
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



    const PASSWORD_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_@#$%^&])[\S]+/;
    const EMAIL_REGEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

    function validateUsername() {
        if (name.length === 0 && touched) {
            return `Must be a Username`
        }
        if (!EMAIL_REGEX.test(name) && touched) {
            return `Must be a valid email address`
        }
        return true
    }



    function validatePassword() {
        if (password.length === 0) {
            return null
        }
        if (password.length < 8) {
            return `Password must be at least 8 characters`
        }
        if (password.length > 72) {
            return `Password must be no more than 72 characters`
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
            return `Password cannot start or end with empty spaces`;
        }
        if (!PASSWORD_REGEX.test(password)) {
            // setError(`Password must contain at least one each of: upper case, lower case, number, and special character`)
            return `Password must contain at least one each of: upper case, lower case, number, and special character`
        }
        return true
    }

    function validateConfirmPassword() {
        if (confirmPassword.length === 0) {
            return null
        }
        if (confirmPassword !== password) {
            return `Passwords must match`
        }
        return true
    }

    const updateTouched = () => {
        if (!touched) {
            return setTouched(true)
        }
    }

    const updateName = (e) => {
        setName(e.target.value)
        updateTouched()
    }

    function checkIfValid() {
        console.log('validatePassword()', validatePassword())
        console.log('validateConfirmPassword()', validateConfirmPassword())
        console.log('validateUsername()', validateUsername())
        if (
            validatePassword() === true
            && validateConfirmPassword() === true
            && validateUsername() === true
        ) {
            return true
        }
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
                        onChange={updateName}
                        required />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input placeholder='password' type="password"
                        name='password' id='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required />

                    <div>
                        <label htmlFor="confirm_password">Password: </label>
                        <input placeholder='password' type="password"
                            name='confirm_password' id='confirm_password'
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required />
                    </div>
                    <ValidationError
                        message={validateUsername()}
                        errorPosition={'relative'} />
                    <ValidationError
                        message={validatePassword()}
                        errorPosition={'relative'} />
                    <ValidationError
                        message={validateConfirmPassword()}
                        errorPosition={'relative'} />
                </div>
                <button
                    type="button"
                    onClick={handleCancel}>Cancel</button>
                <button
                    type="submit"
                    disabled={!checkIfValid()}
                >Submit</button>
            </form>
        </div>
    )
}
