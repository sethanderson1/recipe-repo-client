import React from 'react'
import './BackButton.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function BackButton(props) {
    return (
        <button
            className='btn back-button light-primary-color'
            onClick={props.handleClickBack}
            >
            <FontAwesomeIcon
                className='fontawesome-back'
                icon={faChevronLeft} size="2x" />
        </button>
    )
}

export default BackButton;