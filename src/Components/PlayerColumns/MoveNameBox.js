import React from 'react';

export function MoveNameBox(props) { 
    if (props.gamePhase === "main") { // display nothing on main screen
        return
    } else {
        if (props.turn % 2 === 1) { // display CAST during user input turn
            return (
                <p className = 'font-aref text-3xl'>CAST!</p>
            )
        }
        else { // display the move name during the display turn(or nothing if no move was played)
            return (
                <p className = 'font-aref text-3xl'>{props.move.toUpperCase()}</p>
            )
        }
    }
}   
