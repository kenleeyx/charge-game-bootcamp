import React from 'react';

export function Scoreboard(props) {
    //takes in movelist and current energy - need to convert that to the table
    return(
        <div>
            {props.p1score} : {props.p2score}
        </div>
    )
}   

