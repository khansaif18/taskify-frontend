import React from 'react'
import { useTodo } from '../context/TodoProvider'
import Todo from './Todo'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import PlusIcon from './PlusIcon'
import Filter from './Filter'
import AllTasks from './AllTasks'
import Incomplete from './Incomplete'
import Completed from './Completed'


export default function Todos() {

    const todo = useTodo()
    const filter = todo.filter
    const todos = todo.todos

    const navigate = useNavigate()

    if (todos.length < 1) {
        return (
            <div className={todo.showForm || todo.socialShow ? 'blur no-tasks' : 'no-tasks'}>
                <h1>Welcome to Task<span>ify!</span></h1>
                <h3> Can't See  Anything?🤷‍♂️</h3>
                <h3>Click On The Button Below to <span>Get Started!</span></h3>
                <PlusIcon />
            </div>
        )
    }

    return (
        <div className={todo.showForm || todo.editStatus || todo.socialShow ? 'blur todos-main' : 'todos-main'}>
            <Filter />
            <div className='todos'>
                {filter.all &&  <AllTasks />}
                {filter.complete && <Completed />}
                {filter.incomplete && <Incomplete />}
                <PlusIcon />
            </div>
        </div>
    )
}
