import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useTodo } from '../context/TodoProvider';

export default function Header() {

    const { setSocialShow, setShowForm, setSearchShow, filter, setFilter } = useTodo()

    const handleInfo = () => {
        setSocialShow(prev => !prev)
        setShowForm(false)
    }

    const handleSearch = () => {
        setFilter({ ...filter, all: true, complete: false, incomplete: false })
        setSearchShow(prev => !prev)
    }

    return (
        <div className='header'>
            <div className="head">
                <span className='info' onClick={handleInfo}><FontAwesomeIcon icon={faQuestionCircle} /></span>
                <h1>Task<span>ify</span></h1>
                <span className='search' onClick={handleSearch}><FontAwesomeIcon icon={faSearch} /></span>
            </div>
            <p>Manage Your <span>Tasks</span> and <span>Notes</span> at One Place</p>
        </div>
    )
}
