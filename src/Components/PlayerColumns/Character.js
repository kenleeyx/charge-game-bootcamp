import React from 'react';

//<Character player = {this.state.playerOne} moveList = {this.state.moveList} turn = {this.state.turnCount}/>
export function Character(props) {
    let avatar = null;
    if (props.player.shields < 0) { // player is dead
        avatar = <img src="./Images/skull.png" className = 'scale-50' alt = 'skull and crossbones for dead player'/>
    }else if (props.player.movePlayed === '') { // no move played
        avatar = <img src="./Images/wizard-neutral.png" alt ='wizard in neutral position' className = {`${props.player.playerName === "playerTwo" ? '-scale-x-100 -translate-x-16':'scale-x-100 translate-x-16'}`}/>
    } else if (props.turn % 2 === 1){ //user-input turn; when they input a move wizard changes to ready position
        avatar = <img src="./Images/wizard-ready.png" alt='wizard preparing to cast' className = {`${props.player.playerName === "playerTwo" ? '-scale-x-100 -translate-x-16':'scale-x-100 translate-x-16'}`}/>
    } else if (props.turn % 2 === 0){ //display-result turn; display the image corresponding to the move
        avatar = <img src={props.moveList[props.player.movePlayed].image} alt='wizard casting a spell' className = {`${props.player.playerName === "playerTwo" ? '-scale-x-100 -translate-x-16':'scale-x-100 translate-x-16'}`}/>
    }
    return(
        <div>
            <div id='shieldTwo' className = {`border-solid border-green-500 border-2 rounded-t-full border-b-0 p-6 pb-0 m-10 mb-0 ${props.player.shields >= 2 ? 'border-opacity-100' : 'border-opacity-0'}`}>
                <div id='shieldOne' className = {`border-solid border-yellow-500 rounded-t-full border-b-0 ${props.player.shields >= 1 ? 'border-2' : 'border-0'}`}>
                    {avatar}
                </div>
            </div>
        </div>
    )
}   
