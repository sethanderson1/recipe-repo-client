import React, { useContext, useState } from 'react';
import config from '../config';
import RecipesContext from '../RecipesContext';
import ValidationError from '../ValidationError/ValidationError';
import BackButton from '../BackButton/BackButton';
import './SignUp.css';

export default function SignUp(props) {
    const context = useContext(RecipesContext);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [touched, setTouched] = useState(false);
    const [nameTaken, setNameTaken] = useState(false);

    function handleCancel() {
        props.history.push(`/`);
    };

    const handleSubmit = e => {
        e.preventDefault();
        postSignUpUser({
            user_name: name,
            password,
        });
    };

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
                postLoginUser({
                    user_name: name,
                    password,
                });
            })
            .catch(err => {
                if (err.error.message === 'Username already taken') {
                    setNameTaken(true);
                };
                console.log('err', err);
            });
    };

    function errorMessage() {
        if (nameTaken) {
            return '*Username already taken'
        };
    };

    function postLoginUser(credentials) {
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
                sessionStorage.setItem('currentCategoryId', '0')
                props.history.push('/categories')
            })
            .catch(err => {
                console.log('err', err);
            });
    };

    async function storeToken(authToken) {
        await localStorage.setItem('authToken', authToken);
        context.handleChangeIsLoggedIn(true);
    };

    const PASSWORD_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_@#$%^&])[\S]+/;
    const EMAIL_REGEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    let usernameTrue = false;
    let passwordTrue = false;
    let confirmPasswordTrue = false;

    function validateUsername() {
        if (name.length === 0 && touched) {
            return `*Must have an Email`
        };
        if (!EMAIL_REGEX.test(name) && touched) {
            return `*Must be a valid email address`
        };
        usernameTrue = true;
        return false;
    };

    function validatePassword() {
        if (password.length === 0) {
            return null;
        }
        if (password.length < 8) {
            return `*Password must be at least 8 characters`;
        }
        if (password.length > 72) {
            return `*Password must be no more than 72 characters`;
        };
        if (password.startsWith(' ') || password.endsWith(' ')) {
            return `*Password cannot start or end with empty spaces`
        };
        if (!PASSWORD_REGEX.test(password)) {
            return `*Password must contain at least one each of: upper case, lower case, number, and special character`;
        };
        passwordTrue = true;
        return false;
    };

    function validateConfirmPassword() {
        if (confirmPassword.length === 0) {
            return null;
        }
        if (confirmPassword !== password) {
            return `*Passwords must match`;
        };
        confirmPasswordTrue = true;
        return true;
    };

    const updateTouched = () => {
        if (!touched) {
            return setTouched(true);
        };
    };

    const updateName = (e) => {
        setName(e.target.value);
        updateTouched();
    };

    function checkIfValid() {
        if (
            !usernameTrue || !passwordTrue || !confirmPasswordTrue
        ) {
            return true;
        };
        return false;
    };

    function handleClickBack() {
        props.history.push('/');
    };

    function toggleHoverClass() {
        if (!checkIfValid()) {
            return ['SignUp__submit', 'allowHover'].join(' ')
        } else {
            return 'SignUp__submit'
        };
    };

    return (
        <div className='SignUp__signup-form-container-wrapper'>
            <BackButton handleClickBack={handleClickBack} />
            <h1 className='SignUp__signup-title'>Sign up</h1>
            <div className='SignUp__signup-form-container'>
                <form onSubmit={handleSubmit}
                    className='SignUp__signup-form'>
                    <div className='SignUp__label-input-wrapper'>
                        <label htmlFor="SignUp__user_name">Email </label>
                        <input placeholder='Email' type="text"
                            name='user_name' id='SignUp__user_name'
                            value={name}
                            onChange={updateName}
                            required
                            autoFocus />
                    </div>
                    <div className='SignUp__label-input-wrapper'>
                        <label htmlFor="password">Password </label>
                        <input placeholder='password' type="password"
                            name='password' id='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required />

                        <div className='SignUp__label-input-wrapper'>
                            <label className='confirm-password-label' htmlFor="confirm_password">Confirm Password </label>
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
                        <ValidationError
                            message={errorMessage()}
                            errorPosition={'relative'} />
                    </div>
                    <div className='signup-form-buttons-wrapper'>
                        <button
                            className='allowHover'
                            type="button"
                            onClick={handleCancel}>Cancel</button>
                        <button
                            className={toggleHoverClass()}
                            type="submit"
                            disabled={checkIfValid()}
                        >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};