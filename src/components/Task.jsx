import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTodo } from '../context/TodoProvider'
import TooltipBtn from './TooltipBtn'
import toast from 'react-hot-toast'
import BackButton from './BackButton'

export default function Task() {

    const { taskId } = useParams()
    const { todos } = useTodo()
    const todoo = useTodo()
    const navigate = useNavigate()

    return (
        <div className={todoo.showForm || todoo.editStatus || todoo.socialShow ? 'blur task-main' : 'task-main'}>
            {
                todos.map(todo => {
                    if (todo.id === taskId) {
                        return (
                            <div key={todo.id} className='task'>
                                <BackButton />
                                <hr />
                                <h1>{todo.title}</h1>

                                <h3 className='task-desc'>{todo.description}</h3>

                                <p className='create'>{`Created at ${todo.createDate}`}</p>

                                {todo.updateDate && <p className='update'>{`Updated at ${todo.updateDate}`}</p>}

                                <div className="create-update-btn">
                                    <TooltipBtn
                                        icon='✎'
                                        tooltip='Edit Task'
                                        width='65'
                                        handleClick={() => {
                                            todoo.setEditStaus(prev => !prev)
                                            todoo.setEditedText(todo.title)
                                            todoo.setEditedDescription(todo.description)
                                            todoo.setEditId(todo.id)
                                        }}
                                    />
                                    <TooltipBtn
                                        icon='✖'
                                        tooltip='Delete Task'
                                        width='83'
                                        handleClick={() => {
                                            todoo.removeTodo(todo.id)
                                            toast.error('One Task Deleted')
                                            navigate('/')
                                        }}
                                    />
                                </div>

                            </div>
                        );
                    }
                    return null;
                })
            }
        </div>
    )
}
