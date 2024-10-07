import React from 'react'
import { useTask } from '../context/TaskProvider'
import { X } from 'lucide-react'

export default function SearchInput() {

    const { searchValue, setSearchValue } = useTask()

    return (
        <form className='relative'>
            {
                searchValue &&
                <span className='absolute right-3 top-[50%] translate-y-[-50%] opacity-40 hover:opacity-80 duration-200 cursor-pointer'
                    onClick={() => setSearchValue('')}>
                    <X size={14} />
                </span>
            }
            <input
                className='bg-transparent my-border py-[6px] px-5 w-[320px] outline-none rounded-3xl placeholder:opacity-30 placeholder:tracking-wide'
                placeholder='Search Here..'
                type="text"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                autoFocus='on'
            />
        </form>
    )
}
