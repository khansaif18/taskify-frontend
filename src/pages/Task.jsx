import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Check, Pencil, Trash, X, AlarmClockPlusIcon, Loader2 } from 'lucide-react'
import { useTask } from '../context/TaskProvider'
import { useNavigate, useParams } from 'react-router-dom'
import Checkbox from '../components/Checbox'
import Delete from '../components/Delete'
import Loader from '../components/Loader'
import toast from 'react-hot-toast'
import formatDateTime from '../service/getDay'
import Schedule from '../components/Schedule'
import NotificationComponent from '../components/NotificationComponent '

export default function Task() {
    const params = useParams()
    const navigate = useNavigate()
    const { user, tasks, loading, updateTask, toggleComplete, deleteTask, setState } = useTask()
    const task = tasks ? tasks.filter(item => item._id === params.taskId) : []
    const activeTask = task[0]

    const [showDelete, setShowDelete] = useState(false)
    const [showSchedule, setShowSchedule] = useState(false)
    // const [isLoading, setIsLoading] = useState(false) // new state
    const [isEditing, setIsEditing] = useState(false)

    const [newTitle, setNewTitle] = useState(null)
    const [newDescription, setNewDescription] = useState(null)


    useEffect(() => {
        if (!loading && activeTask) {
            setNewTitle(activeTask.title)
            setNewDescription(activeTask.description)
        }
    }, [])

    const titleTextareaRef = useRef(null)
    const descriptionTextareaRef = useRef(null)

    const autoResize = (textareaRef) => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }

    useEffect(() => {
        if (isEditing) {
            autoResize(titleTextareaRef)
            autoResize(descriptionTextareaRef)
        }
    }, [newTitle, newDescription, isEditing])

    const handleTitleChange = (e) => {
        setNewTitle(e.target.value)
        autoResize(titleTextareaRef)
    }

    const handleDescriptionChange = (e) => {
        setNewDescription(e.target.value)
        autoResize(descriptionTextareaRef)
    }

    const formatTextWithNewLines = (inputText) => {
        return inputText.split("\n").map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    // if (loading) return <Loader />

    if (activeTask) return (
        <div className=' w-full min-h-[85vh] overflow-scroll flex justify-center pb-10'>
            {/* {loading && <Loader />} */}
            <div className='relative my-bg w-[550px] max-w-[100%] px-5 flex flex-col py-6 pt-0 overflow-hidden'>
                {/* Top section */}
                <div className='flex items-center bb justify-between py-2 px-0 gap-2'>

                    <span onClick={() => navigate('/')} className='icon bg-[#453c3c6a]'>
                        <ArrowLeft size={18} />
                    </span>
                    <div className={`flex gap-2 ${activeTask.createdBy === user.uid ? ' ' : ' hidden '}`}>
                        <span className={`icon bg-[#453c3c6a] `} onClick={() => setShowDelete(true)}>
                            <Trash size={18} />
                        </span>
                        {/* added class 'hidden' to hide the reminder icon temporarily */}
                        <span className={`icon hidden bg-[#453c3c6a] ${activeTask.isCompleted ? ' hidden ' : ' '} `} onClick={() => setShowSchedule(true)}>
                            <AlarmClockPlusIcon size={18} />
                        </span>
                    </div>
                </div>


                {/* Mid Section */}

                {isEditing ? (
                    <textarea
                        ref={titleTextareaRef}
                        className={`pt-2 mb-1 text-violet-600 capitalize bg-transparent/20 font-bold tracking-wide text-2xl outline-none w-full  min-w-0 resize-none `}
                        disabled={!isEditing}
                        value={newTitle}
                        onChange={handleTitleChange}
                        rows={1}
                        style={{ overflow: 'hidden' }}
                        spellCheck="false"
                    />
                ) : (
                    <h1 className={`pt-2 mb-1 bg-transparent capitalize text-violet-600 font-bold tracking-wide text-2xl outline-none w-full min-w-0 overflow-hidden ${activeTask.isCompleted ? 'line' : ''}`}>{activeTask.title}</h1>
                )}

                <span className='font-normal text-[12px] text-gray-500 my-2 tracking-wide'>
                    {formatDateTime(activeTask.createdAt)} | {`${isEditing ? newDescription.trim().length : activeTask.description.trim().length} Characters`}
                </span>


                {isEditing ? (
                    <textarea
                        ref={descriptionTextareaRef}
                        className={`text-white/80  cursor-text bg-transparent/20 outline-none resize-none w-full`}
                        disabled={!isEditing}
                        value={newDescription}
                        onChange={handleDescriptionChange}
                        rows={1}
                        style={{ overflow: 'hidden' }}
                        autoFocus
                        autoCorrect="off"
                        spellCheck="false"
                    />
                ) : (
                    <p className={`opacity-50 text-md `}>{formatTextWithNewLines(activeTask?.description)}</p>
                )}

                {/* Bottom Section */}
                <div className="mt-5 flex justify-between flex-wrap">
                    {activeTask.updatedAt && <p className='italic min-w-[250px] font-light text-[10px] text-zinc-500'>Updated At {activeTask.updatedAt}</p>}
                </div>

                <div className='mt-5 flex items-center justify-end gap-1'>
                    <div className={`flex ${activeTask.createdBy === user?.uid ? ' ' : ' hidden '}`}>
                        <span className='check-icon '>
                            {
                                isEditing ? '' :
                                    loading ?
                                        <Loader2 className='loading' size={18} /> :
                                        <Checkbox
                                            isChecked={activeTask.isCompleted}
                                            handleChange={() => {
                                                try {
                                                    toggleComplete(activeTask._id)
                                                        .then(() => !activeTask.isCompleted ?
                                                            toast('Marked Completed!', { icon: '🫡', }) :
                                                            toast('Marked Incomplete', { icon: '🙂', }))
                                                } catch (error) {
                                                    toast.error('something went wrong')
                                                } finally {
                                                    setIsEditing(false)
                                                }
                                            }}
                                        />
                            }
                           
                        </span>
                        {
                            isEditing ? (
                                <span title='save' onClick={() => {
                                    if (!loading) {
                                        setIsEditing(prev => !prev)
                                        if (newTitle.trim() !== activeTask.title.trim() || newDescription.trim() !== activeTask.description.trim()) {
                                            if (activeTask.createdBy === user.uid) {
                                                // setIsLoading(true)
                                                updateTask(activeTask._id, newTitle, newDescription)
                                                    .then(() => {
                                                        toast.success('Updated Successfully')
                                                        // setIsLoading(false)
                                                    })
                                                    .catch(() => {
                                                        toast.error('Something went wrong')
                                                        // setIsLoading(false)
                                                    })
                                            } else {
                                                toast.error('You are not authorized to update this')
                                            }
                                        } else {
                                            setIsEditing(false)
                                            toast('Nothing to Update!', { icon: '🥱', })
                                        }
                                    }
                                }}
                                    className='check icon bg-violet-500'>
                                    <Check size={18} />
                                </span>
                            ) : (
                                <span title='edit'
                                    onClick={() => {
                                        if (!loading) setIsEditing(prev => !prev)
                                    }}
                                    className={`pencil icon bg-[#453c3c6a] ${activeTask.isCompleted ? ' hidden ' : ' '}`}>
                                    {
                                        loading ?
                                            <Loader2 className='loading' size={18} /> :
                                            <Pencil size={18} />
                                    }
                                </span>
                            )
                        }
                    </div>
                </div>
                {showSchedule &&
                    <Schedule
                        handleCancel={() => setShowSchedule(false)}
                        title={activeTask.title.replace(/\b\w/g, (char) => char.toUpperCase())}
                        noteId={params.taskId}
                    />
                }
                {showDelete &&
                    <Delete
                        handleCancel={() => setShowDelete(false)}
                        handleDelete={() => {
                            if (activeTask.createdBy === user?.uid) {
                                deleteTask(activeTask._id)
                                    .then(() => {
                                        navigate('/')
                                        setState(prev => !prev)
                                        toast.success('Deleted Successfully')
                                    })
                                    .catch(() => toast.error('Something went wrong'))
                            } else {
                                toast.error('You are not authorized to delete this')
                            }
                        }}
                    />}
            </div>
        </div >
    )

}

