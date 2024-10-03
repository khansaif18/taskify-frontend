import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Check, Pencil, Trash } from 'lucide-react'
import { useTask } from '../context/TaskProvider'
import { useNavigate, useParams } from 'react-router-dom'
import Checkbox from '../components/Checbox'
import Delete from '../components/Delete'
import Loader from '../components/Loader'
import MiniLoader from '../components/MiniLoader'

export default function Task() {
    const params = useParams()
    const navigate = useNavigate()
    const { tasks, loading, updateTask, toggleComplete, deleteTask, setState } = useTask()
    const task = tasks ? tasks.filter(item => item._id === params.taskId) : []
    const activeTask = task[0]

    const [showDelete, setShowDelete] = useState(false)

    const [isEditing, setIsEditing] = useState(false)
    const [newTitle, setNewTitle] = useState(activeTask?.title || '')
    const [newDescription, setNewDescription] = useState(activeTask?.description || '')

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


    // if (loading) return <Loader />

    if (activeTask) return (
        <div className=' w-full min-h-[85vh] flex justify-center pb-10'>
            {loading && <Loader />}
            <div className='relative my-bg w-[550px] max-w-[100%] px-5 flex flex-col py-6 pt-0 overflow-hidden'>
                {/* Top section */}
                <div className='flex items-center bb justify-between py-2 px-0 gap-2'>
                    <span onClick={() => navigate('/')} className='icon bg-[#453c3c6a]'>
                        <ArrowLeft size={18} />
                    </span>
                    <span className='icon bg-[#453c3c6a]'
                        onClick={() => setShowDelete(true)}>
                        <Trash size={18} />
                    </span>
                </div>


                {/* Mid Section */}
                {isEditing ? (
                    <textarea
                        ref={titleTextareaRef}
                        className={`pt-2 mb-2 text-violet-600 bg-transparent font-bold tracking-wide text-xl outline-none w-full  min-w-0 resize-none `}
                        disabled={!isEditing}
                        value={newTitle}
                        onChange={handleTitleChange}
                        rows={2}
                        style={{ overflow: 'hidden' }}
                    />
                ) : (
                    <h1 className={`pt-2 mb-2 bg-transparent capitalize text-violet-600 font-bold tracking-wide text-2xl outline-none w-full min-w-0 overflow-hidden ${activeTask.isCompleted ? 'line' : ''}`}>{activeTask.title}</h1>
                )}

                {isEditing ? (
                    <textarea
                        ref={descriptionTextareaRef}
                        className={`text-white/80 cursor-text bg-transparent outline-none resize-none w-full`}
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
                    <p className='opacity-60 text-md'>{activeTask?.description}</p>
                )}

                {/* Bottom Section */}
                <div className="mt-5 flex justify-between flex-wrap">
                    {activeTask.updatedAt && <p className='italic min-w-[250px] font-light text-[10px] text-zinc-500'>Last Updated At {activeTask.updatedAt}</p>}
                    <p className='italic min-w-[250px] font-light text-[10px] text-zinc-500'>Created At {activeTask.createdAt}</p>
                </div>

                <div className='mt-5 flex items-center justify-end gap-1'>
                    <div className='flex'>
                        <span className='check-icon '>
                            <Checkbox
                                isChecked={activeTask.isCompleted}
                                handleChange={() => toggleComplete(activeTask._id)}
                            />
                        </span>
                        {
                            isEditing ? (
                                <span onClick={() => {
                                    setIsEditing(prev => !prev)
                                    if (newTitle !== activeTask.title || newDescription !== activeTask.description) {
                                        updateTask(activeTask._id, newTitle, newDescription)
                                    } else setIsEditing(false)
                                }}
                                    className='check icon bg-violet-500'>
                                    <Check size={18} />
                                </span>
                            ) : (
                                <span onClick={() => setIsEditing(prev => !prev)} className='pencil icon bg-[#453c3c6a]'>
                                    <Pencil size={18} />
                                </span>
                            )
                        }
                    </div>
                </div>
                {showDelete &&
                    <Delete
                        handleCancel={() => setShowDelete(false)}
                        handleDelete={() => {
                            deleteTask(activeTask._id)
                                .then(() => {
                                    navigate('/')
                                    setState(prev => !prev)
                                })
                        }}
                    />}
            </div>
        </div>
    )
}
