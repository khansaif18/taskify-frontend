import React, { useState } from 'react';
import { useTodo } from '../context/TodoProvider';
import Todo from './Todo';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function AllTasks() {
    const todo = useTodo();
    const todos = todo.todos;
    const navigate = useNavigate();

    const { searchValue } = useTodo();

    const filteredTasks = todos.filter(task => task.title.toLowerCase().includes(searchValue.toLowerCase()));

    if (filteredTasks.length < 1) return (
        <div>
            <p className='comp-noComp'>Oops! Nothing found for '{searchValue}' 🤷‍♂️<br />
                Try Something Else..
            </p>
        </div>
    )

    return (
        <>
            {filteredTasks.map(task => (
                <Todo
                    key={task.id}
                    title={task.title.length > 25 ? task.title.slice(0, 25) + '...' : task.title}
                    date={task.createDate}
                    description={task.description.length > 25 ? task.description.slice(0, 45) + '...' : task.description}
                    cardClick={() => navigate(`/task/${task.id}`)}
                    isComp={task.isCompleted}
                    handleRemove={(e) => {
                        e.stopPropagation();
                        todo.removeTodo(task.id);
                        toast.error('One Task Deleted');
                    }}
                    handleEdit={(e) => {
                        e.stopPropagation();
                        todo.setEditStaus(prev => !prev);
                        todo.setEditedText(task.title);
                        todo.setEditedDescription(task.description);
                        todo.setEditId(task.id);
                    }}
                />
            ))}
        </>
    );
}
