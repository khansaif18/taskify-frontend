import React, { useState } from 'react'
import { useTask } from '../context/TaskProvider'

export default function Filter() {

    const { filter, setFilter, } = useTask()

    return (
        <div className="filter my-border rounded-3xl">
            <div className="radio-input ">
                <label>
                    <input
                        id="value-1"
                        type="radio"
                        checked={filter.all}
                        onChange={() => {
                            setFilter({ ...filter, all: true, complete: false, incomplete: false })
                        }}
                    />
                    <span className='font-bold'>All Tasks</span>
                </label>

                <label>
                    <input
                        id="value-2"
                        type="radio"
                        checked={filter.complete}
                        onChange={() => {
                            setFilter({ ...filter, all: false, complete: true, incomplete: false })
                        }}
                    />
                    <span className='font-bold'>Completed</span>
                </label>

                <label>
                    <input
                        id="value-3"
                        type="radio"
                        checked={filter.incomplete}
                        onChange={() => {
                            setFilter({ ...filter, all: false, complete: false, incomplete: true })
                        }}
                    />
                    <span className='font-bold'>Incomplete</span>
                </label>
                <span className="selection"></span>
            </div>
        </div>

    )
}
