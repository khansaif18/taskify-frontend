import React from 'react'
import SearchInput from '../components/SearchInput'
import Tasks from '../components/Tasks'
import Filter from '../components/Filter'
import { useTask } from '../context/TaskProvider'

export default function Home() {

  const { showSearch, showFilter } = useTask()

  return (
    <div className={`w-full`}
      // style={
      //   showFilter && showSearch
      //     ? { paddingTop: '100px' }
      //     : showFilter || showSearch
      //       ? { paddingTop: '55px' }
      //       : {}
      // }
      >
      {/* {
        showSearch || showFilter ?
          <>
            <div className=' w-full z-50 fixed top-[52px] pt-4 nav-border bg-[#1b1b1b] backdrop-blur-sm pb-3 flex items-center justify-center flex-col flex-wrap gap-2'>
              {showSearch && <SearchInput />}
              {showFilter && <Filter />}
            </div>
          </> : ''
      } */}
      <Tasks />
    </div>
  )
}
