import React from 'react'

export default function Loader() {
    return (
        <div className='w-full h-screen absolute top-0 left-0 backdrop-blur-[2px] mt-[-5rem] z-40 flex items-center justify-center'>
            <svg className="h-13 w-12 text-blue-600 blink-animation" viewBox="0 0 24 24" fill="currentColor">
                <path className="box box1" d="M4 4h7v7H4V4z" />
                <path className="box box2" d="M13 4h7v7h-7V4z" />
                <path className="box box3" d="M13 13h7v7h-7v-7z" />
                <path className="box box4" d="M4 13h7v7H4v-7z" />
            </svg>
        </div>
    )
}
