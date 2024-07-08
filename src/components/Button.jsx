import React from 'react'

export default function Button({ name }) {

    return (
        <button className="button delete"  type='submit'>
            {name}
        </button>
    )
}
