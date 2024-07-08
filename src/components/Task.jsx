import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTodo } from '../context/TodoProvider';
import TooltipBtn from './TooltipBtn';
import toast from 'react-hot-toast';
import BackButton from './BackButton';
import Checkbox from './Checkbox';

export default function Task() {
    const { taskId } = useParams();
    const { todos, toggleComplete, removeTodo, setEditStaus, setEditedText, setEditedDescription, setEditId, showForm, editStatus, socialShow } = useTodo();
    const navigate = useNavigate();

    const handleCheckboxChange = (todo) => {
        toggleComplete(todo.id);
        const updatedStatus = !todo.isCompleted;
        updatedStatus ? toast.success('Task Marked Completed') : toast.error('Task Marked Incomplete');
    };

    return (
        <div className={showForm || editStatus || socialShow ? 'blur task-main' : 'task-main'}>
            {
                todos.map(todo => {
                    if (todo.id === taskId) {
                        return (
                            <div key={todo.id} className='task'>
                                <BackButton />
                                <hr />
                                <h1 className={todo.isCompleted ? ' line' : ''}>
                                    {todo.title}
                                </h1>

                                <h3 className='task-desc' style={todo.updateDate ? { marginBottom: '0' } : { marginBottom: '1.5rem' }}>
                                    {todo.description}
                                </h3>

                                <p className='create'>
                                    {`Created at ${todo.createDate}`}
                                </p>

                                {todo.updateDate && <p className='update'>{`Updated at ${todo.updateDate}`}</p>}

                                <div className="create-update-btn">
                                    <Checkbox
                                        isChecked={todo.isCompleted}
                                        handleChange={() => handleCheckboxChange(todo)}
                                    />
                                    <TooltipBtn
                                        icon='✎'
                                        tooltip='Edit Task'
                                        width='65'
                                        handleClick={() => {
                                            setEditStaus(prev => !prev);
                                            setEditedText(todo.title);
                                            setEditedDescription(todo.description);
                                            setEditId(todo.id);
                                        }}
                                    />
                                    <TooltipBtn
                                        icon='✖'
                                        tooltip='Delete Task'
                                        width='83'
                                        handleClick={() => {
                                            removeTodo(todo.id);
                                            toast.error('One Task Deleted');
                                            navigate('/');
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
    );
}
