import React, { useEffect, useRef } from 'react'
import { useTask } from '../context/TaskProvider'
import { Loader2 } from 'lucide-react'

export default function Delete({ handleDelete, handleCancel }) {

    const { loading } = useTask()

    const deleteRef = useRef()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (deleteRef.current && !deleteRef.current.contains(event.target)) {
                handleCancel()
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleCancel]);

    return (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center mt-[-5rem]'>
            <div
                className="w-[250px] tudun flex flex-col p-4 items-center justify-center bg-[#181818] shadow-lg rounded-2xl " ref={deleteRef}>
                <div className="">
                    <div className="text-center px-3 py-2 flex-auto justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12 flex items-center text-gray-600 mx-auto"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"></path>
                        </svg>
                        <h2 className="text-xl font-bold py-1 text-gray-200">Are you sure?</h2>
                        <p className="text-sm text-gray-500 px-2">This cannot be undone</p>
                    </div>
                    <div className="px-2 py-1 w-full  mt-1 text-center flex items-center justify-center">
                        <button
                            className="mb-2 md:mb-0 bg-gray-600 px-5 py-2 text-sm shadow-sm font-medium tracking-wider  text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-700 transition ease-in duration-300 w-[90px]" onClick={handleCancel}>
                            Cancel  </button>
                        <button
                            className="bg-violet-600 hover:bg-violet-800 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider text-white rounded-full transition ease-in duration-300 flex items-center justify-center w-[90px]" onClick={handleDelete}>
                            {loading ? <Loader2 className='loading' size={18} /> : 'Confirm'}
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}
