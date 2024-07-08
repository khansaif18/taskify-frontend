import React from 'react'
import { useTodo } from '../context/TodoProvider'
import toast from 'react-hot-toast'
import Button from './Button'


export default function EditTodo() {

    const todo = useTodo()

    const handleSubmit = (e) => {
        e.preventDefault()
        const currentDate = new Date().toLocaleString()
        const desc = todo.editedDescription === '' ? 'No Description Given 🤷‍♂️' : todo.editedDescription;
        if (todo.editedText !== '') {
            todo.updateTodo(todo.editId, todo.editedText, desc, currentDate)
            todo.setUpdateDate(currentDate)
            todo.setEditStaus(false)
            toast.success('Task Updated Successfully')
        }
    }

    return (
        <div className='main-form'>
            <h2>Edit Your Task</h2>
            <form onSubmit={handleSubmit} className='form'>

                <input type="text"
                    value={todo.editedText}
                    onChange={e => todo.setEditedText(e.target.value)}
                    placeholder='Edit the Title...'
                    autoComplete='off'
                    autoFocus
                />

                <textarea
                    rows='5'
                    type='text'
                    placeholder='Edit the Description...'
                    value={todo.editedDescription}
                    onChange={e => todo.setEditedDescription(e.target.value)}
                    autoComplete='off'
                />

                <Button name='Update Task' />

                <span className='close-form' onClick={() => todo.setEditStaus(false)}>✖</span>
            </form>
        </div>
    )
}
