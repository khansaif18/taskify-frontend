import React from 'react'

export default function Plus({ handlePlus, fixed, hide }) {
    return (
        <div className={`${fixed ? 'fixed bottom-7' : ''} overflow-hidden ${hide ? 'hidden' : ''}`}>
            <button onClick={handlePlus}
                className="group cursor-pointer outline-none hover:rotate-90 duration-300 rounded-full backdrop-blur-lg">
                <svg
                    className="stroke-violet-500 fill-none group-hover:fill-violet-800 group-active:stroke-violet-200 group-active:fill-violet-600 group-active:duration-0 duration-300"
                    viewBox="0 0 24 24"
                    height="50px"
                    width="50px"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        strokeWidth="1.5"
                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"></path>
                    <path strokeWidth="1.5" d="M8 12H16"></path>
                    <path strokeWidth="1.5" d="M12 16V8"></path>
                </svg>
            </button>
        </div>
    )
}
