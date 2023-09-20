import React from 'react';

//<Scoreboard p1score={props.playerOne.gamesWon} p2score={props.playerTwo.gamesWon} />
export function Scoreboard(props) {
    //takes in movelist and current energy - need to convert that to the table
    return(
        <div className = 'font-aref'>
            {props.p1score} : {props.p2score}
        </div>
    )
}   

