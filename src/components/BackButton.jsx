import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function BackButton() {

    const navigate = useNavigate()

    return (
        <button className='back' onClick={() => navigate('/')}>
            <span class="span-mother">
                <span><FontAwesomeIcon icon={faArrowLeft} /></span>
                <span>B</span>
                <span>a</span>
                <span>c</span>
                <span>k</span>
            </span>
            <span class="span-mother2">
                <span><FontAwesomeIcon icon={faArrowLeft} /></span>
                <span>B</span>
                <span>a</span>
                <span>c</span>
                <span>k</span>
            </span>
        </button>


    )
}
