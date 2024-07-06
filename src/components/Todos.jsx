import React from 'react'
import { useTodo } from '../context/TodoProvider'
import Todo from './Todo'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import PlusIcon from './PlusIcon'


export default function Todos() {

    const todo = useTodo()
    const todos = todo.todos

    const navigate = useNavigate()

    if (todos.length < 1) {
        return (
            <div className='no-tasks'>
                <h1>Welcome to Task<span>ify!</span></h1>
                <h3> Can't See  Anything?🤷‍♂️</h3>
                <h3>Click On The Button Below to <span>Get Started!</span></h3>
                <PlusIcon/>
            </div>
        )
    }

    return (
        <div className={todo.showForm || todo.editStatus ? 'blur todos' : 'todos'}>
            {
                todos.map((task) => (
                    <Todo
                        key={task.id}
                        title={task.title.length > 25 ? task.title.slice(0, 25) + '...' : task.title}
                        date={task.createDate}
                        description={task.description.length > 25 ? task.description.slice(0, 50) + '...' : task.description}
                        cardClick={() => navigate(`/task/${task.id}`)}
                        handleRemove={(e) => {
                            e.stopPropagation();
                            todo.removeTodo(task.id)
                            toast.error('One Task Deleted')
                        }}
                        handleEdit={(e) => {
                            e.stopPropagation();
                            todo.setEditStaus(prev => !prev)
                            todo.setEditedText(task.title)
                            todo.setEditedDescription(task.description)
                            todo.setEditId(task.id)
                        }
                        }
                    />
                ))
            }
            <PlusIcon />
        </div>
    )
}
