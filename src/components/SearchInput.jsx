import React from 'react'
import { useTask } from '../context/TaskProvider'

export default function SearchInput() {

    const { searchValue, setSearchValue } = useTask()

    return (
        <form>
            <input
                className='bg-transparent my-border py-[6px] px-5 w-[320px] outline-none rounded-3xl placeholder:opacity-30 placeholder:tracking-wide'
                placeholder='Search Task'
                type="text"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                autoFocus='on'
            />
        </form>
    )
}
