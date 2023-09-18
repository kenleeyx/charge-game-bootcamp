import React from 'react';

export function ChargeCounter(props) {
    if (props.gamePhase !== "main") {
        return(
            <div>
                <p>{'⚡'.repeat(props.value)}</p>
            </div>
        )
    } else {
        return
    }
    
}   