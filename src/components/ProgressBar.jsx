import React from 'react'

export default function ProgressBar({ title, width, taskLength, totalLength }) {
    return (
        <div className='item bg-black/20 px-2 py-3 rounded-md mb-3'>
            <div className="range">
                <div className="fill" style={{ width: `${width}% ` }}> </div>
            </div>
            <div className='flex items-center justify-between mt-2'>
                <p className='text-sm'>{title} - {taskLength}/{totalLength} </p>
                <p className='text-sm'>{width}%</p>
            </div>
        </div>
    )
}
