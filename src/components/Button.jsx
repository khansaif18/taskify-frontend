import React from 'react'

export default function Button({ name }) {

    return (
        <button className="button delete" style={{ width: '150px' }} type='submit'>
            {name}
        </button>
    )
}
