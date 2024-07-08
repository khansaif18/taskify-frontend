import React from 'react'
import { useTodo } from '../context/TodoProvider'
import { useNavigate } from 'react-router-dom'
import Todo from './Todo'
import toast from 'react-hot-toast'


export default function Incomplete() {

    const { todos } = useTodo()
    const todo = useTodo()
    const navigate = useNavigate()

    const incompleteTasks = todos.filter(task => !task.isCompleted)

    return (
        <>
            {
                incompleteTasks.length > 0 ? (
                    incompleteTasks.map((task) => (
                        <Todo
                            key={task.id}
                            title={task.title.length > 25 ? task.title.slice(0, 25) + '...' : task.title}
                            date={task.createDate}
                            description={task.description.length > 25 ? task.description.slice(0, 45) + '...' : task.description}
                            cardClick={() => navigate(`/task/${task.id}`)}
                            isComp={task.isCompleted}
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
                            }}
                        />
                    ))
                ) : (
                    <p className='comp-noComp'>Oops! No incomplete Tasks 🤷‍♂️</p>
                )
            }
        </>
    )

}
