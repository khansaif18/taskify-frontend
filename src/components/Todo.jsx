import React from 'react'

export default function Card({ title, description, date, cardClick, handleRemove, handleEdit, isComp }) {

    return (
        <div className="card" onClick={cardClick}>
            <h3 className={isComp ? 'card__title line' : 'card__title'}> {title} </h3>
            <p className="card__content"> {description} </p>
            <div className="card__date"> {date}</div>
            <div className="card__arrow">
                <span onClick={handleEdit} className='pencil icon'>✎</span>
                <span onClick={handleRemove} className='cross icon'>✖</span>
            </div>
        </div>
    )
}
