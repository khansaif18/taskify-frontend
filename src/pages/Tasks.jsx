import React, { useEffect, useState } from 'react'
import { useTask } from '../context/TaskProvider'
import Loader from '../components/Loader'
import TaskCard from '../components/TaskCard'
import { useNavigate } from 'react-router-dom'
import TaskForm from '../components/TaskForm'
import Plus from '../components/Plus'
import Login from '../components/Login'
import toast from 'react-hot-toast'
import SearchInput from '../components/SearchInput'
import Filter from '../components/Filter'

export default function Tasks() {

    const navigate = useNavigate()
    const { tasks, searchValue, filter, loading, user, showSearch, showFilter } = useTask()
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
        <div className='min-h-[85vh] w-full flex flex-col items-center pt-[100px] opacity-50 z-40'>
            {loading && <Loader />}
            <h2 className='text-3xl tracking-wide font-bold mb-1'>Welcome to <span className='text-violet-700'>!Taskify</span> </h2>
            <p className='opacity-50 mb-5'>Manage all your notes at one place</p>
            <Login />
        </div>
    )

    return (
        <div className=' min-h-[90vh] w-full flex items-start justify-center pb-5 z-50'>
            <div className='flex w-full items-center justify-center pt-2 gap-5 flex-wrap '>
                {loading && <Loader />}
                {/* Filter and Search */}
                {
                    showSearch || showFilter ?
                        <>
                            <div className=' w-full pt-1 flex items-center justify-center flex-wrap gap-3'>
                                {showFilter && <Filter />}
                                {showSearch && <SearchInput />}
                            </div>
                        </> : ''
                }

                {filteredTasks.length > 0 ? (
                    filteredTasks.slice().reverse().map((task, index) => (
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
                    <div className=' tracking-wide font-semibold  flex items-center mt-[6rem] flex-col'>
                        <p className='opacity-50 text-2xl mb-1 capitalize'>Nothing Here! 🤷‍♂️</p>
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
            {tasks && tasks.length > 0 ? <Plus fixed
                handlePlus={() => {
                    if (tasks && tasks.length < 25) {
                        setShowForm(prev => !prev)
                    } else {
                        toast(() => (
                            <span>
                                You can not have more then <b className='text-violet-600'>25 Notes</b>  at a time,<b className='text-violet-600'> delete some previous notes</b>
                            </span>
                        ), { duration: 5000, icon: '🙎‍♂️' });
                    }
                }} /> : ''}

        </div>
    )
}
