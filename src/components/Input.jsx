import React from 'react'
import { useTodo } from '../context/TodoProvider'
import toast from 'react-hot-toast'
import Button from './Button'



export default function Input() {

    const todo = useTodo()

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date().toLocaleString();
        const desc = todo.description === '' ? 'No Description Given 🤷‍♂️' : todo.description;
        if (todo.inputTodo !== '') {
            todo.addTodo(todo.inputTodo, desc, currentDate)
            todo.setShowForm(false)
            todo.setCreateDate(currentDate)
            todo.setInputTodo('')
            todo.setDescription('')
            toast.success('New Task Created!')
        }
    }

    return (
        <div className='main-form'>
            <h2>Create a New Task</h2>
            <form onSubmit={handleSubmit} className='form'>
                
                <input type="text"
                    value={todo.inputTodo}
                    onChange={e => todo.setInputTodo(e.target.value)}
                    placeholder='Enter the Title...'
                    autoComplete='off'
                    autoFocus
                />
 
                <textarea
                    rows='5'
                    type='text'
                    placeholder='Add a Description (Optional)...'
                    value={todo.description}
                    onChange={e => todo.setDescription(e.target.value)}
                    autoComplete='off'
                />

                <Button name='Create Task' />

                <span className='close-form' onClick={() => todo.setShowForm(false)}>✖</span>
            </form>
        </div>
    )
}
