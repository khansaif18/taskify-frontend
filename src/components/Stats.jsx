import React, { useEffect, useRef, useState } from 'react'
import { useTask } from '../context/TaskProvider'
import { X } from 'lucide-react'
import ProgressBar from './ProgressBar'

export default function Dashboard() {

    const { showDashboard, setShowDashboard, tasks, loading } = useTask()

    const statRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (statRef.current && !statRef.current.contains(event.target)) {
                setShowDashboard(false)                
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDashboard]);



    const [complete, setComplete] = useState(0)
    const [inComplete, setInComplete] = useState(0)

    const [totalWidth, setTotalWidth] = useState(0)
    const [completeWidth, setCompleteWidth] = useState(0)
    const [inCompleteWidth, setInCompleteWidth] = useState(0)

    useEffect(() => {
        if (!loading) {
            const completedTasks = tasks.filter(task => task.isCompleted)
            const incompleteTasks = tasks.filter(task => !task.isCompleted)

            setComplete(completedTasks)
            setInComplete(incompleteTasks)

            const calculatedTotalWidth = Math.round((tasks.length / 25) * 100)
            const calculatedCompleteWidth = Math.round((completedTasks.length / tasks.length) * 100)
            const calculatedInCompleteWidth = Math.round((incompleteTasks.length / tasks.length) * 100)

            setTimeout(() => {
                setTotalWidth(calculatedTotalWidth)
                setCompleteWidth(calculatedCompleteWidth)
                setInCompleteWidth(calculatedInCompleteWidth)
            }, 200)
        }
    }, [loading, tasks])

    if (!loading) return (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center mt-[-5rem] z-40'>
            <div className="max-w-[95%] tudun mx-auto relative overflow-hidden z-10 bg-[#1b1b1b] py-8 px-6 rounded-lg  before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute  after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12 w-[320px]" ref={statRef}>

                <span className='absolute right-1 top-1 cursor-pointer p-1 rounded opacity-30 hover:bg-gray-600' onClick={() => setShowDashboard(false)}>
                    <X />
                </span>

                <h1 className='text-2xl text-center my-2 mb-2 tracking-wider'>Stats</h1>

                <div className='w-full flex items-center justify-center mb-4'>
                    <span className='stat-bor'></span>
                </div>

                <ProgressBar
                    title={'Total'}
                    width={totalWidth}
                    taskLength={tasks.length}
                    totalLength={'25'}
                />

                <ProgressBar
                    title={'Completed'}
                    width={completeWidth}
                    taskLength={complete.length}
                    totalLength={tasks.length}
                />

                <ProgressBar
                    title={'Incomplete'}
                    width={inCompleteWidth}
                    taskLength={inComplete.length}
                    totalLength={tasks.length}
                />

                <div className='flex items-center justify-center mt-1 relative top-3 '>
                    <a href='https://www.github.com/khansaif18' target='_blank' className='text-sm bg-black/30 px-4 py-1 rounded-md cursor-pointer tracking-wider opacity-50'>&copy; khansaif18</a>
                </div>

            </div>
        </div>
    )
}
