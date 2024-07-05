import React from 'react'

export default function TooltipBtn({ icon, tooltip, handleClick, width }) {
    return (
        <div className="uiverse" onClick={handleClick}>
            <span className="tooltip" style={{ width: width + 'px' }}>{tooltip}</span>
            <span>{icon}</span>
        </div>
    )
}
