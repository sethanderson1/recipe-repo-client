import React from 'react';
import './SignUp.css'

export default function SignUp() {
    return (
        <div className='SignUp__signup-form-container'>
            <form className='SignUp__signup-form'>
                <label>Email</label>
                <input />
                <label>Password</label>
                <input />
                <label>Confirm Password</label>
                <input />
                <button>Cancel</button>
                <button>Submit</button>
            </form>
        </div>
    )
}
