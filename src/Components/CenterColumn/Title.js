import React from 'react';

export function Title(props) { // takes gamephase and winner
    let displayText = null;
    let displayicon = null;
    if (props.gamePhase === "main") {
        displayText = 'CHARGE';
        displayicon = '⚡';
    } else if(props.gamePhase === 'end') {
        displayText = `Winner: ${props.winner}`
    } 
    return(
        <div>
            <div className="text-6xl">{displayText}</div>
            <div className="text-6xl">{displayicon}</div> 
        </div>
    )

    

}