import React, { useContext, useState } from 'react'
import RecipesContext from '../RecipesContext'
import './Login.css';
import config from '../config'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";


export default function SignUp(props) {
    const [error, setError] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const context = useContext(RecipesContext)

    function handleCancel() {
        props.history.push(`/`)
    }

    const handleSubmit = e => {
        e.preventDefault()
        postLoginUser({
            user_name: username,
            password,
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
        <div className='Login__login-form-container'>
            <form id='login-form' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="user_name">Username: </label>
                    <input placeholder='username' type="text"
                        name='user_name' id='user_name'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
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
                {error}
                <div className='login-form-buttons-wrapper'>
                    <button type='button' onClick={handleCancel}>Cancel</button>
                    <button type='submit'>Log In</button>
                </div>
            </form>
            <div className='demo-credentials'>
                Demo:
                <div className='credential-wrapper'>
                    <p>Username: user1@gmail.com</p>
                    <button className="copy-to-clipboard"
                        onClick={() => navigator.clipboard.writeText(`user1@gmail.com`)}

                    >
                        <FontAwesomeIcon icon={faClipboardList} size="2x" />
                    </button>
                </div>
                <div className='credential-wrapper'>

                    <p>Password: Password1!  </p>
                    <button className="copy-to-clipboard"
                        onClick={() => navigator.clipboard.writeText(`Password1!`)}
                    >
                        <FontAwesomeIcon icon={faClipboardList} size="2x" />
                    </button>
                </div>
            </div>

        </div>
    )
}
