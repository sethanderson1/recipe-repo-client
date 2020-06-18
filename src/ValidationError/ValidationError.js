import React from 'react';
import PropTypes from 'prop-types';
import './ValidationError.css'

export default function ValidationError(props) { 
    if (props.message) {
        const errorPosition = props.errorPosition === 'absolute' 
        ? 'error-absolute'
        : 'error-relative'
        return (
            <div className={errorPosition}>{props.message}</div>
        ) 
    }
    return <></>
}

ValidationError.propTypes = {
    message: PropTypes.string
}