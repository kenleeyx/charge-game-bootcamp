import React from 'react';

export function MoveNameBox(props) { // need to configure this to take in the logic to display PREPARE
    if (props.gamePhase === "main") {
        return
    } else {
        if (props.turn % 2 === 1) {
            return (
                <div>
                    <p>CAST!</p>
                </div>
            )
        }
        else {
            return (
                <div>
                    <p>{props.move.toUpperCase()}</p>
                </div>
            )
        }
    }
}   