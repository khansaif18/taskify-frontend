import React, { useState } from 'react'
import { useTodo } from '../context/TodoProvider'

export default function Filter() {

    const { filter, setFilter, setSearchShow } = useTodo()

    return (
        <div className="filter">
            <div className="radio-input">
                <label>
                    <input
                        id="value-1"
                        type="radio"
                        checked={filter.all}
                        onChange={() => {
                            setFilter({ ...filter, all: true, complete: false, incomplete: false })
                            setSearchShow(false)
                        }}
                    />
                    <span>All Tasks</span>
                </label>

                <label>
                    <input
                        id="value-2"
                        type="radio"
                        checked={filter.complete}
                        onChange={() => {
                            setFilter({ ...filter, all: false, complete: true, incomplete: false })
                            setSearchShow(false)
                        }}
                    />
                    <span>Completed</span>
                </label>

                <label>
                    <input
                        id="value-3"
                        type="radio"
                        checked={filter.incomplete}
                        onChange={() => {
                            setFilter({ ...filter, all: false, complete: false, incomplete: true })
                            setSearchShow(false)
                        }}
                    />
                    <span>Incomplete</span>
                </label>
                <span className="selection"></span>
            </div>
        </div>

    )
}
