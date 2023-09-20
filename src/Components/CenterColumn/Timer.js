import React from "react";

//<Timer p1moveKeys =, p2moveKeys=, onMovePlayed = {this.registerMove}, p1movePlayed={this.state.playerOne.movePlayed}, p2movePlayed={this.state.playerTwo.movePlayed} passTurnUpdate = {this.passTurnUpdate} turnCount = {this.state.turnCount}
export default class Timer extends React.Component {
    constructor(props) {
      super(props);
    }

  handleKeyPress = (event) => {
    if (this.props.turnCount % 2 === 0 || this.props.turnCount <= 0) { // do nothing if it's the display turn
      return;
    }
    
      const letter = event.key.toUpperCase(); //register moves if it's the casting turn
      
      if (letter in this.props.p1moveKeys && this.props.p1movePlayed === '') {
        this.props.onMovePlayed(this.props.p1moveKeys[letter], 'playerOne');
      };
      if (letter in this.props.p2moveKeys && this.props.p2movePlayed === '') {
        this.props.onMovePlayed(this.props.p2moveKeys[letter], 'playerTwo');
      } else {
        return;
      }
    }
      
    componentDidMount(){ 
      this.timerId = setInterval(()=>this.props.passTurnUpdate(), 1000);
      window.addEventListener("keydown", this.handleKeyPress);
    }
  
    componentWillUnmount(){ // i am not actually sure if we still need this as i have these commands activated upon player winning but it doesn't break the code...
      clearInterval(this.timerId);
      window.removeEventListener("keydown", this.handleKeyPress);
    }

    determineTimerDisplay(){
      if (this.props.turnCount < 0) {
        return Math.abs(this.props.turnCount)
      } else if (this.props.turnCount === 0) {
        return 'GO!'
      }
    }
  
    render() {
      return (
          <p className = "font-aref text-5xl text-white font-bold p-5">{this.determineTimerDisplay()}</p>
      );
    }
  }
