import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className='navbar'>
            <NavLink
                to="/"
                className={({ isActive }) => isActive ? 'active' : ''}>
                All Tasks
            </NavLink>
            <NavLink
                to="/"
                className={({ isActive }) => isActive ? 'active' : ''}>
                Completed
            </NavLink>
            <NavLink
                to="/"
                className={({ isActive }) => isActive ? 'active' : ''}>
                Uncomplete
            </NavLink>
        </nav>
    )
}
