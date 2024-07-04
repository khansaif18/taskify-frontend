import React from 'react'

export default function Card({ title, description, date, handleRemove, handleEdit }) {
    return (
        <div className="card">
            <h3 className="card__title"> {title} </h3>
            <p className="card__content"> {description} </p>
            <div className="card__date"> {date}</div>
            <div className="card__arrow">
                <span onClick={handleEdit} className='pencil icon'>✎</span>
                <span onClick={handleRemove} className='cross icon'>✖</span>
            </div>
        </div>
    )
}
