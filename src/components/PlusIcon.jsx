import React from 'react'
import { useTodo } from '../context/TodoProvider'

export default function PlusIcon() {

    const todo = useTodo()

    return (
        <div className='plus'>
            <button
                className='plus-icon'
                onClick={() => {
                    todo.setShowForm(prev => !prev)
                    todo.setEditStaus(false)
                }}>
                Add Task ✙
            </button>
        </div>
    )
}
