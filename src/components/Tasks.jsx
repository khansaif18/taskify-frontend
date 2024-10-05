import React, { useEffect, useState } from 'react'
import { useTask } from '../context/TaskProvider'
import Loader from './Loader'
import TaskCard from './TaskCard'
import { useNavigate } from 'react-router-dom'
import TaskForm from './TaskForm'
import Plus from './Plus'
import Login from './Login'

export default function Tasks() {

    const navigate = useNavigate()
    const { tasks, searchValue, filter, loading, setLoading, user } = useTask()
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        const handleEsc = (event) => event.key === 'Escape' ? setShowForm(false) : ''
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc)
    }, []);


    const filteredTasks = tasks
        ? tasks.filter(task => {
            const matchesSearch = searchValue
                ? task.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                task.description.toLowerCase().includes(searchValue.toLowerCase())
                : true

            const matchesFilter =
                filter.all ? true
                    : filter.complete ? task.isCompleted
                        : filter.incomplete ? !task.isCompleted
                            : true

            return matchesSearch && matchesFilter
        })
        : []

    // if (loading) return <Loader />

    if (!user) return (
        <div className='min-h-[85vh] w-full flex flex-col items-center pt-[100px] opacity-50'>
            {loading && <Loader />}
            <h2 className='text-3xl tracking-wide font-bold mb-1'>Welcome to <span className='text-violet-700'>!Taskify</span> </h2>
            <p className='opacity-50 mb-5'>Manage all your notes at one place</p>
            <Login />
        </div>
    )

    return (
        <div className=' min-h-[85vh] w-full  flex items-start justify-center pb-20'>
            <div className='flex w-full items-center justify-center gap-5 flex-wrap'>
                {loading && <Loader />}
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task, index) => (
                        <TaskCard
                            key={task._id}
                            complete={task.isCompleted}
                            count={index + 1}
                            title={task.title}
                            description={task?.description}
                            createdAt={task?.createdAt}
                            handleCardClick={() => {
                                navigate(`/${task._id}`)
                            }}
                        />

                    ))
                ) : (
                    <div className=' tracking-wide font-semibold mt-[5rem] flex items-center flex-col'>
                        <p className='opacity-50 text-2xl mb-1 capitalize'>Nothing Here! 🤷</p>
                        {tasks && tasks.length < 1 ?
                            <div className='opacity-50 text-center'>
                                <p className='text-sm mb-5'>Click on the button below to get started!</p>
                                <Plus handlePlus={() => setShowForm(prev => !prev)} />
                            </div> : ''}
                    </div>
                )}
            </div>
            {showForm &&
                <TaskForm
                    handleClose={() => setShowForm(false)}
                />
            }
            {tasks && tasks.length > 0 ? <Plus fixed handlePlus={() => setShowForm(prev => !prev)} /> : ''}

        </div>
    )
}
