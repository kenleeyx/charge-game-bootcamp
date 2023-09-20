import './App.css';
import React from 'react';
import {ChargeCounter} from "./Components/PlayerColumns/ChargeCounter"
import {MoveNameBox} from "./Components/PlayerColumns/MoveNameBox"
import {Rulebox} from "./Components/Bottom-area/Rulebox"
import {Title} from "./Components/CenterColumn/Title"
import Timer from "./Components/CenterColumn/Timer"
import {Character} from "./Components/PlayerColumns/Character"
import baseState from './baseState.json'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = structuredClone(baseState);
  }

  handleClick = (e) => {
    let newState = structuredClone(baseState)
    newState.playerOne.gamesWon = (this.state.winner === 'Player 1' ? (this.state.playerOne.gamesWon + 1) : this.state.playerOne.gamesWon);
    newState.playerTwo.gamesWon = (this.state.winner === 'Player 2' ? (this.state.playerTwo.gamesWon + 1) : this.state.playerTwo.gamesWon);
    if (e.target.name === 'Play') {
      newState.gamePhase = 'game'
    } 
    // else if (e.target.name ==='Play vs Computer'){
    //   newState.gamePhase = 'game';
    //   newState.comPlayer = true;
    // }
    this.setState(newState)
  }

  registerMove = (move, player) =>{
    console.log(`Registering ${move} to ${player}`)
    if (this.state[`${player}`].charge >= this.state.moveList[move].chargeCost) {
      let newPlayer = this.state[`${player}`];
      newPlayer.movePlayed = move;
      this.setState({[`${player}`]:newPlayer})
    }
  }

  passTurnUpdate = () => {
    let newPlayerOne = this.state.playerOne; // copy out state
    let newPlayerTwo = this.state.playerTwo;
    if (this.state.turnCount <= 0) { //just countdown if timer is less than 0
      this.setState({ turnCount: this.state.turnCount + 1 })
      return;
    }else if (this.state.turnCount % 2 === 0) { //on even turns(user inputs move)
      newPlayerOne.movePlayed = ''; // refresh moveplayed
      // if (this.state.comPlayer === true) {
      //   newPlayerTwo.movePlayed = this.determineComMove()
      // } else {}
      newPlayerTwo.movePlayed = ''; // refresh moveplayed
    } else { // on odd turns(display moves and animations, calculate charge and shields)
      if (newPlayerOne.movePlayed) {
        newPlayerOne.charge -= this.state.moveList[newPlayerOne.movePlayed].chargeCost //calculate charge consumed
      }
      if (newPlayerTwo.movePlayed) {
        newPlayerTwo.charge -= this.state.moveList[newPlayerTwo.movePlayed].chargeCost
      }
      const damageDealt = this.determineDamageDealt(newPlayerOne.movePlayed, newPlayerTwo.movePlayed) //calculate damage dealt
      newPlayerOne.shields -= damageDealt[0];
      newPlayerTwo.shields -= damageDealt[1];
    }
    const newWinner = this.determineWinner(newPlayerOne.shields, newPlayerTwo.shields) //check for winner
    let newGamePhase = 'game';
    if (newWinner) {
      clearInterval(this.timerId);
      window.removeEventListener("keydown", this.handleKeyPress);
      newGamePhase = 'end'
    }
    this.setState({ //setState at end of turn
      playerOne: newPlayerOne,
      playerTwo: newPlayerTwo,
      turnCount: this.state.turnCount + 1,
      winner: newWinner,
      gamePhase: newGamePhase,
    })
  }

  // determineComMove = (player1 = this.state.playerOne, player2 = this.state.playerTwo, moveList = this.state.moveList) => {
  //   let possibleMoves = Object.values(moveList).filter((ele)=>ele.chargeCost < player2.charge)
  //   if (player1.charge === 0) {
  //     possibleMoves = possibleMoves.filter((ele)=>ele.name !== "Block")
  //   }
  //   const comMove =possibleMoves[Math.floor(possibleMoves.length * Math.random())].name;
  //   return comMove;
  // }
     

  determineDamageDealt = (move1 = 'Charge', move2 = 'Charge') => {
    move1 = move1 ? move1: 'Charge' //treat a non-move as charge for purpose of dmg calculation
    move2 = move2 ? move2: 'Charge' //treat a non-move as charge for purpose of dmg calculation
    if (this.state.moveList[move1].type === 'ATK' && this.state.moveList[move2].type === 'CHG') { // p1 hits p2
      return [0,1];
    } else if (this.state.moveList[move2].type === 'ATK' && this.state.moveList[move1].type === 'CHG'){ // p2 hits p1
      return[1,0];
    } else if (this.state.moveList[move2].type === 'ATK' && this.state.moveList[move1].type === 'ATK'){ // both p1 and p2 hit
      return [0,0]; //to add in the compare ranks later!
    } else { //everyone is charging/defending/doing nothing
      return [0,0]
    }
  }

  determineWinner = (p1shield, p2shield) => {
    if (p1shield < 0) {
      return 'Player 2'
    } else if (p2shield < 0) {
      return 'Player 1'
    } else {
      return null
    }
  }

  render() {
    const p1moveKeys=Object.values(this.state.moveList).reduce((acc,move) => { //generate a map of move keys to move names
      acc[move.p1keyboard] = move.name; // add entry to new object {movekey : movename}
      return acc;
    }, {});
    const p2moveKeys=Object.values(this.state.moveList).reduce((acc,move) => {
      acc[move.p2keyboard] = move.name;
      return acc;
    }, {});
    
    return (
      <div id="Main-App" className="bg-slate-900 text-white h-screen text-center">
        <div id="Main-area" className="h-3/4 flex">
          <div id="Left-column" className="flex flex-col items-stretch justify-between bg-sky-700 w-1/3">
            <div id="Left-column-top-portion" className='h-60'>
              <ChargeCounter value={this.state.playerOne.charge} gamePhase={this.state.gamePhase} />
              <MoveNameBox move={this.state.playerOne.movePlayed} gamePhase={this.state.gamePhase} turn={this.state.turnCount} />
            </div>
            <Character player = {this.state.playerOne} moveList = {this.state.moveList} turn = {this.state.turnCount}/>
          </div>
          <div id="Center-column" className="bg-yellow-950 items-center w-1/3">
            <div id = 'Timer-rectangle' className="bg-yellow-950 h-40">
              <div id = 'Timer-square'>
                {this.state.gamePhase === 'game' && 
                <Timer p1moveKeys = {p1moveKeys} p2moveKeys={p2moveKeys} onMovePlayed = {this.registerMove} p1movePlayed={this.state.playerOne.movePlayed} p2movePlayed={this.state.playerTwo.movePlayed} passTurnUpdate = {this.passTurnUpdate} turnCount = {this.state.turnCount}/>
                }
              </div>
            </div>
            <Title gamePhase = {this.state.gamePhase} winner = {this.state.winner} />
            <br />
            <div className="h-20">
            {this.state.gamePhase === 'main' && <button onClick = {this.handleClick} name = 'Play' className = 'font-aref bg-slate-400 text-white border-black border-4 px-2 pt-0 pb-2 text-2xl'>Play</button>}
            {/* {this.state.gamePhase === 'main' && <button onClick = {this.handleClick} name = 'Play vs Computer' className = 'font-aref bg-slate-400 text-white border-black border-4 px-2 pt-0 pb-2 text-2xl'>Play</button>} */}
            {this.state.gamePhase === 'end' && <button onClick = {this.handleClick} name = 'Play' className = 'font-aref bg-slate-400 text-white border-black border-4 px-2 pt-0 pb-2 text-2xl'>Play again</button>}
            {/* might need to add a transition... */}
            {/* try transition ease-in duration-500  - apply to everything?*/}
            </div>
            <div className="h-20">
            {this.state.gamePhase === 'end' && <button onClick = {this.handleClick} name = 'Main' className = 'font-aref bg-slate-400 text-white border-black border-4 px-2 pt-0 pb-2 text-2xl'>Main screen</button>}
            </div>
          </div>
          <div id="Right-column" className="flex flex-col items-stretch justify-between bg-rose-700 w-1/3">
            <div id="Right-column-top portion" className='h-60'>
              <ChargeCounter value={this.state.playerTwo.charge} gamePhase={this.state.gamePhase} />
              <MoveNameBox move={this.state.playerTwo.movePlayed} gamePhase={this.state.gamePhase} turn={this.state.turnCount} />
            </div>
            <Character player = {this.state.playerTwo} moveList = {this.state.moveList} turn = {this.state.turnCount}/>
          </div>
        </div> 
        <Rulebox 
        gamePhase = {this.state.gamePhase} 
        moves={this.state.moveList} 
        playerOne = {this.state.playerOne} 
        playerTwo = {this.state.playerTwo}
        />
      </div>
    )
  }
}

export default App;
