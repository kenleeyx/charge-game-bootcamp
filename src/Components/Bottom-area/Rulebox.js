//To contain both movelists and scoreboard
import React from 'react';
import {Movelist} from "./Movelist"
import {Scoreboard} from "./Scoreboard"

//<Rulebox gamePhase = {this.state.gamePhase} moves={this.state.moveList} playerOne = {this.state.playerOne} playerTwo = {this.state.playerTwo}}/>
export function Rulebox(props) {
    //takes in movelist and current energy - need to convert that to the table
    let content = null;
    if (props.gamePhase === "main") {
        content = (
            <div className="Bottom-area bg-slate-700 h-1/4 flex flex-col justify-around">
                <div id = 'Rules title'>You are a wizard dueling an evil sorcerer! You are fast with your wand... but they are just as fast!</div>
                <div id = 'Rules-container' className = 'flex flex-row justify-around'>
                    <div id = 'Rule-One' className = 'w-1/3'> 1) Charge up energy with the CHARGE move! </div>
                    <div id = 'Rule-Two'> 2)Use your energy to cast offensive spells! </div>
                    <div id = 'Rule-Three' className = 'w-1/3'> 3) Block your opponent's spells to avoid losing shields... and your life! </div>
                </div>
                <div id = 'Time-limit-rule'>You have a time limit of one second for each action... so sharpen those reflexes!"</div>
            </div>
        )

    } else {
        content = (
            <div className="Bottom-area bg-slate-700 h-1/4 flex justify-between">
                <div id="Player-1-moves" className="flex justify-evenly w-1/3 bg-red-800">
                    <Movelist moves={props.moves} charge={props.playerOne.charge} playerName = "playerOne"/>
                </div>
                <div id="Game-scoreboard" className="flex flex-col justify-center text-6xl">
                    <Scoreboard p1score={props.playerOne.gamesWon} p2score={props.playerTwo.gamesWon} />
                    </div>
                <div id="Player-2-moves" className="flex justify-evenly w-1/3 bg-red-800">
                    <Movelist moves={props.moves} charge={props.playerTwo.charge} playerName = "playerTwo"/>
                </div>
            </div>
        )
    }
    return content;
    
}   