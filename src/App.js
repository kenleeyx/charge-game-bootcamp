import logo from './logo.svg';
import './App.css';
import React from 'react';
import {ChargeCounter} from "./Components/PlayerColumns/ChargeCounter"
import {MoveNameBox} from "./Components/PlayerColumns/MoveNameBox"
import {Rulebox} from "./Components/Bottom-area/Rulebox"
import {Title} from "./Components/CenterColumn/Title"
import Timer from "./Components/CenterColumn/Timer"

// document.addEventListener("keydown", this.handlemethod, false);
// Timeline:
// Wireframe and schedule, rough structure of the page, state elements. 13/9
// Learn Tailwind and how to addeventlistener for key presses, ensure all the containers for elements are in the correct places using CSS - 14/9
//Get the text components into place
//In class: Any software to style the text of my main title?

// Move and button functionality (make sure they increase and decrease the counters/adjust state properly)-15/9 - transitions?
// Draw stick figures and get characters displayed - 16-18/9
// Implement the timer - 19/9
// Mop up/buffer - 20/9
// Deadline - 21/9

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gamePhase:'main',
      turnCount : 2,
      winner:null,
      playerOne: {
        playerName: 'playerOne',
        shields: 3,
        charge: 5,
        movePlayed:'',
        gamesWon: 0,
      },
      playerTwo: {
        playerName: 'playerTwo',
        shields: 3,
        charge: 0,
        movePlayed:'Lightning',
        gamesWon:0,
      },
      moveList: require('./moves.json'),
    }
  }

  handleClick = (e) => {
    console.log(this.state.gamePhase)
    if (e.target.name ==='Play') {
      this.setState({
        gamePhase:'game'
    })
  } else if (e.target.name === 'Main') {
      this.setState({
        gamePhase:'main',
        winner:null,
        turnCount:-3,
        playerOne: {
          playerName: 'playerOne',
          shields: 3,
          charge: 0,
          movePlayed:'',
          gamesWon: this.state.winner === 'playerOne' ? this.state.playerOne.gamesWon + 1 : this.state.playerOne.gamesWon,
        },
        playerTwo: {
          playerName: 'playerTwo',
          shields: 3,
          charge: 0,
          movePlayed:'L',
          gamesWon: this.state.winner === 'playerTwo' ? this.state.playerTwo.gamesWon + 1 : this.state.playerTwo.gamesWon
        },
      })
    }
  }

  registerMove = (move, player) =>{
    console.log(`Registering ${move} to ${player}`)
    this.setState({[`${player}`]:{movePlayed : move}})// i need to fix this to just updatemovePlayed...
  }

  // passTurnUpdate = () => {
  //   let newPlayerOne = this.state.playerOne;
  //   let newPlayerTwo = this.state.playerTwo;
  //   if (this.state.turnCount % 2 === 0) {
  //     newPlayerOne.movePlayed = '';
  //     newPlayerTwo.movePlayed = '';
  //   }
  //   // //if turn is even(0), setState for an input turn(1) render
  //     // this.setState(
  //     //   turn = turn+1
  //     //   movePlayed = ''
  //     //   //event listener will take care of the movePlayed update during turn 1 which will change the magician pose
  //     // )
  //     // //if turn is odd(1), setState for an display turn(2) render
  //     // this.setState(
  //     //   turn = turn+1
  //     //   movePlayed = no change(so actually no need to update) // move name display ONLY displays on even turns
  //     //   charge=  newCharge // charge counters will autoupdate based on state
  //     //   shields = newShields //so will shields
  // }

  render() {
    const p1moveKeys=Object.values(this.state.moveList).reduce((acc,move) => {
      acc[move.p1keyboard] = move.name;
      return acc;
    }, {});
    const p2moveKeys=Object.values(this.state.moveList).reduce((acc,move) => {
      acc[move.p2keyboard] = move.name;
      return acc;
    }, {});
    
    return (
      <div className="App bg-slate-900 text-white h-screen">
        <div className="Main-area h-3/4 flex justify-evenly">
          <div id="Left-column" className="flex flex-col items-stretch justify-between bg-sky-300 w-1/3">
            <ChargeCounter value={this.state.playerOne.charge} gamePhase = {this.state.gamePhase}/>
            
            <MoveNameBox move={this.state.playerOne.movePlayed} gamePhase = {this.state.gamePhase} turn = {this.state.turnCount}/>
            <img src = "./Images/wizard-lightning.png"/>
          </div>
          <div className="Center-column bg-white text-black items-center">
            <div id = 'Timer-rectangle' className="bg-green-600 h-40">
              <div id = 'Timer-square'>
                {this.state.gamePhase === 'game' && 
                <Timer p1moveKeys = {p1moveKeys} p2moveKeys={p2moveKeys} onMovePlayed = {this.registerMove} p1movePlayed={this.state.playerOne.movePlayed} p2movePlayed={this.state.playerTwo.movePlayed}/>
                }
              </div>
            </div>
            <Title gamePhase = {this.state.gamePhase} winner = {this.state.winner} />
            <br />
            <div className="h-20">
            {this.state.gamePhase === 'main' && <button onClick = {this.handleClick} name = 'Play'>Play</button>}
            {this.state.gamePhase === 'end' && <button onClick = {this.handleClick} name = 'Play'>Play again</button>}
            {/* might need to add a transition... */}
            {/* try transition ease-in duration-500  - apply to everything?*/}
            </div>
            <div className="h-20">
            {this.state.gamePhase === 'end' && <button onClick = {this.handleClick} name = 'Main'>Main screen</button>}
            </div>
          </div>
          <div id="Right-column" className="flex flex-col items-stretch justify-between bg-sky-300 w-1/3">
          <ChargeCounter value={this.state.playerTwo.charge} gamePhase = {this.state.gamePhase}/>
          <MoveNameBox move={this.state.playerTwo.movePlayed} gamePhase = {this.state.gamePhase} turn = {this.state.turnCount}/>
          <img src = "./Images/wizard-lightning.png" className = "-scale-x-100"/>
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


//:crossed_swords: :shield: :zap: :boom:
