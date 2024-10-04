import React from 'react'

export default function TaskCard({ count, title, description, createdAt, complete, handleCardClick }) {
    count = count < 10 ? '0' + count : count
    title = title.length > 25 ? title.slice(0, 25) + '..' : title
    description = description.length > 40 ? description.slice(0, 33) + '..' : description
    return (
        <div onClick={handleCardClick}
            className="w-[330px] bg-[#151515] hover:bg-[#101010] duration-300 rounded-xl my-bg  shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-6 space-y-2 relative overflow-hidden cursor-pointer">
            <div className="w-16 h-16 bg-violet-500 rounded-full absolute -left-5 -top-7">
                <p className="absolute bottom-1 left-[1.65rem] text-white text-xl">{count}</p>
            </div>
            <h1 className={`font-bold text-[1.2rem] pt-2 text-violet-500 capitalize ${complete ? 'line' : ''}`}>{title}</h1>
            <p className="text-sm text-zinc-500 leading-5 ">{description}</p>
            <p className='italic text-[10px] text-zinc-500 flex justify-end'>{createdAt}</p>
           
        </div>
    )
}
