import React from 'react';
import './SignUp.css';




export default function SignUp(props) {
    
function handleCancel() {
    props.history.push(`/`)
}
    return (
        <div className='SignUp__signup-form-container'>
            <form className='SignUp__signup-form'>
                <label>Email</label>
                <input />
                <label>Password</label>
                <input />
                <label>Confirm Password</label>
                <input />
                <button onClick={handleCancel}>Cancel</button>
                <button>Submit</button>
            </form>
        </div>
    )
}
