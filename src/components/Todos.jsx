import React from 'react'
import { useTodo } from '../context/TodoProvider'
import Todo from './Todo'
import toast from 'react-hot-toast'


export default function Todos() {

    const todo = useTodo()
    const todos = todo.todos

    if (todos.length < 1) {
        return (
            <div className='no-tasks'>
                <h1> Can't See  Anything?🤷‍♂️</h1>
                <h3>Click On The Button Below to <span>Get Started!</span></h3>
            </div>
        )
    }

    return (
        <div className={todo.showForm || todo.editStatus ? 'blur todos' : 'todos'}>
            {
                todos.map((task) => (
                    <Todo
                        key={task.id}
                        title={task.title}
                        date={task.date}
                        description={task.description}
                        handleRemove={() => {
                            todo.removeTodo(task.id)
                            toast.error('One Task Deleted')
                        }}
                        handleEdit={() => {
                            todo.setEditStaus(prev => !prev)
                            todo.setEditedText(task.title)
                            todo.setEditedDescription(task.description)
                            todo.setEditId(task.id)
                        }
                        }
                    />
                ))
            }
        </div>
    )
}
