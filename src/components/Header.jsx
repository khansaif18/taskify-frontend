import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useTodo } from '../context/TodoProvider';
import { useLocation } from 'react-router-dom';

export default function Header() {

    const { todos, setSocialShow, setShowForm, searchShow, setSearchShow, filter, setFilter, setSearchValue } = useTodo()

    const handleInfo = () => {
        setSocialShow(prev => !prev)
        setShowForm(false)
    }

    const handleSearch = () => {
        setFilter({ ...filter, all: true, complete: false, incomplete: false })
        setSearchShow(prev => !prev)
        setSearchValue('')
        setSocialShow(false)
    }

    const location = useLocation()
    const path = location.pathname === '/'

    return (
        <div className='header'>
            <div className="head">
                <span className='info' onClick={handleInfo}><FontAwesomeIcon icon={faQuestionCircle} /></span>
                <h1>Task<span>ify</span></h1>
                <span style={path && todos.length > 0 ? { opacity: '0.3' } : { opacity: '0' }} className='search' onClick={handleSearch}>{searchShow ? <span>✖</span> : <FontAwesomeIcon icon={faSearch} />}</span>
            </div>
            <p>Manage Your <span>Tasks</span> and <span>Notes</span> at One Place</p>
        </div >
    )
}
