import React from 'react';

export function Title(props) { // takes gamephase and winner
    let displayText = null;
    let displayText2 = null;
    if (props.gamePhase === "main") {
        displayText = <div className="text-8xl font-bungee-spice">CHARGE</div>;
        displayText2 = <div className="text-8xl">⚡</div> ;
    } else if(props.gamePhase === 'end') {
        displayText = <div className="text-8xl font-bungee-spice">GAME OVER</div> 
        displayText2 = <div className="text-3xl text-white font-aref">{props.winner} won</div>
    } 
    return(
        <div>
            {displayText}
            {displayText2}
        </div>
    )

    

}