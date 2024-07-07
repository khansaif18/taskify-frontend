import React, { useState } from 'react'
import { useTodo } from '../context/TodoProvider'

export default function Filter() {

    const { filter, setFilter } = useTodo()

    return (
        <div className="filter">
            <div className="radio-input">
                <label>
                    <input
                        id="value-1"
                        type="radio"
                        checked={filter.all}
                        onChange={() => setFilter({ ...filter, all: true, complete: false, incomplete: false })}
                    />
                    <span>All Tasks</span>
                </label>

                <label>
                    <input
                        id="value-2"
                        type="radio"
                        checked={filter.complete}
                        onChange={() => setFilter({ ...filter, all: false, complete: true, incomplete: false })}
                    />
                    <span>Completed</span>
                </label>

                <label>
                    <input
                        id="value-3"
                        type="radio"
                        checked={filter.incomplete}
                        onChange={() => setFilter({ ...filter, all: false, complete: false, incomplete: true })}
                    />
                    <span>Incompleted</span>
                </label>
                <span className="selection"></span>
            </div>
        </div>

    )
}
