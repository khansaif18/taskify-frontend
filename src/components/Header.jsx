import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { useTodo } from '../context/TodoProvider';

export default function Header() {

    const { setSocialShow, setShowForm } = useTodo()

    const handleClick = () => {
        setSocialShow(prev => !prev)
        setShowForm(false)
    }

    return (
        <div className='header'>
            <h1>Task<span>ify</span></h1>
            <p>Manage Your <span>Tasks</span> and <span>Notes</span> at One Place</p>
            <span className='info' onClick={handleClick}><FontAwesomeIcon icon={faQuestionCircle} /></span>
        </div>
    )
}
