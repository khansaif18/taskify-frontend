import React, { useEffect, useState } from 'react'
import { useTask } from '../context/TaskProvider'
import { X } from 'lucide-react'

export default function Dashboard() {

    const { setShowDashboard, tasks, loading } = useTask()
    const [complete, setComplete] = useState(0)
    const [inComplete, setInComplete] = useState(0)

    useEffect(() => {
        if (!loading) {
            setComplete(tasks.filter(task => task.isCompleted))
            setInComplete(tasks.filter(task => !task.isCompleted))
        }
    }, [])

    if (!loading) return (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center mt-[-5rem] z-40'>
            <div className="max-w-[95%] tudun mx-auto relative overflow-hidden z-10 bg-[#1b1b1b] py-8 px-6 rounded-lg  before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute  after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12 w-[300px]">

                <span className='absolute right-1 top-1 cursor-pointer p-1 rounded opacity-30 hover:bg-gray-600' onClick={() => setShowDashboard(false)}>
                    <X />
                </span>

                <h1 className='text-2xl text-center my-2 mb-5 tracking-wide'>Note / Task Stats</h1>

                <div className='item bg-black/20 px-2 py-3 rounded-md'>
                    <div className="range">
                        <div className="fill" style={{ width: `${Math.round((tasks.length / 25) * 100)}%` }}> </div>
                    </div>
                    <div className='flex items-center justify-between mt-2'>
                        <p className='text-sm'>Total - {tasks.length}/25 </p>
                        <p className='text-sm'>{Math.round((tasks.length / 25) * 100)}%</p>
                    </div>
                </div>

                <div className='item mt-3 bg-black/20 px-2 py-3 rounded-md'>
                    <div className="range">
                        <div className="fill" style={{ width: `${Math.round((complete.length / tasks.length) * 100)}%` }}> </div>
                    </div>
                    <div className='flex items-center justify-between mt-2'>
                        <p className='text-sm'>Completed - {complete.length}/{tasks.length} </p>
                        <p className='text-sm'>{Math.round((complete.length / tasks.length) * 100)}%</p>
                    </div>
                </div>

                <div className='item mt-3 bg-black/20 px-2 py-3 rounded-md'>
                    <div className="range">
                        <div className="fill" style={{ width: `${Math.round((inComplete.length / tasks.length) * 100)}%` }}> </div>
                    </div>
                    <div className='flex items-center justify-between mt-2'>
                        <p className='text-sm'>Incomplete - {inComplete.length}/{tasks.length} </p>
                        <p className='text-sm'>{Math.round((inComplete.length / tasks.length) * 100)}%</p>
                    </div>
                </div>

            </div>

        </div>
    )
}
