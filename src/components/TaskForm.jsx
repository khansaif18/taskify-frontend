import { X } from 'lucide-react'
import React, { useState } from 'react'
import { useTask } from '../context/TaskProvider'
import toast from 'react-hot-toast'

export default function TaskForm({ handleClose }) {

    const { tasks, user, newTask, setState } = useTask()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (tasks && tasks.length < 25) {
            if (title && user) {
                const taskDescription = description.trim() === '' ? 'No Description Given 🤷‍♂️' : description
                newTask(title, taskDescription, user.uid)
                    .then(() => {
                        handleClose()
                        setState(prev => !prev)
                        toast.success('Created Successfully')
                    }).catch(() => toast.error('Something went wrong, Try again'))
            }
            else toast.error('Fill the requied fields')
        } else {
            toast(() => (
                <span>
                    You can not have more then <b>25 Notes</b>  at a time,<b>  delete some previous notes</b>
                </span>
            ), { duration: 5000 });
        }
    }


    return (
        <div className='fixed  inset-0 bg-black/50 flex items-center justify-center mt-[-5rem] z-40'>
            <div
                className="max-w-[95%] mx-auto relative overflow-hidden z-10 bg-[#1b1b1b] p-8 rounded-lg  before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute  after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
                <span className='absolute right-1 top-1 cursor-pointer p-1 rounded-md opacity-30 hover:bg-gray-600' onClick={handleClose}>
                    <X /></span>

                <h2 className="text-2xl font-bold tracking-wide text-white mb-6">Add New Note</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block tracking-wide text-sm font-medium text-gray-300" htmlFor="name">
                            Title*
                        </label>
                        <input
                            className="mt-1 p-2 w-full opacity-40 focus:opacity-100 duration-200 bg-[#181818c1] outline-none my-border rounded-md text-white placeholder:font-light placeholder:opacity-30 "
                            type="text"
                            placeholder='Title of the note'
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            autoFocus={true}
                            spellCheck='false'
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm tracking-wide font-medium  text-gray-300 " htmlFor="bio">
                            Content</label>
                        <textarea
                            className="mt-1 p-2 w-full bg-[#181818c1] outline-none  my-border rounded-md text-white placeholder:font-light placeholder:opacity-30 opacity-40 focus:opacity-100 duration-200"
                            rows="3"
                            id="bio"
                            placeholder='Content of the note'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            spellCheck='false'
                        ></textarea>
                    </div>

                    <div className="flex justify-end">
                        <button
                            className="bg-gradient-to-r bg-[#352e2ec1] tracking-wider text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                            type="submit">
                            Create
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}
