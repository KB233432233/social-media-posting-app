import React from 'react'

function Follow({ label, value }) {
    return (
        <div className="follow">
            <h4>{label}</h4>
            <span>{value}</span>
        </div>
    )
}

export default Follow
