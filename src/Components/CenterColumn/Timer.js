import React from "react";

//<Timer p1moveKeys =, p2moveKeys=, onMovePlayed = {this.registerMove}, p1movePlayed={this.state.playerOne.movePlayed}, p2movePlayed={this.state.playerTwo.movePlayed}
export default class Timer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        displayTime: -3,
      };
    }

    handleKeyPress = (event) => {
      const letter = event.key.toUpperCase();
      if (letter in this.props.p1moveKeys && this.props.p1movePlayed === '') {
        this.props.onMovePlayed(this.props.p1moveKeys[letter], 'playerOne');
      };
      if (letter in Object.keys(this.props.p2moveKeys) && this.props.p2movePlayed === '') {
        this.props.onMovePlayed(this.props.p2moveKeys[letter], 'playerTwo');
      } else {
        return;
      }
    }    
  
    tick() { 
      // if (this.props.turn % 2 === 0) {
      //   this.props.passTurnUpdate()
      // } else {
      //   this.props.passTurnUpdate()
      // }

      this.setState({displayTime:this.state.displayTime+1})
    }
    
      // //if turn is even(0), setState for an input turn(1) render
      // this.setState(
      //   turn = turn+1
      //   movePlayed = ''
      //   //event listener will take care of the movePlayed update during turn 1 which will change the magician pose
      // )
      // //if turn is odd(1), setState for an display turn(2) render
      // this.setState(
      //   turn = turn+1
      //   movePlayed = no change(so actually no need to update) // move name display ONLY displays on even turns
      //   charge=  newCharge // charge counters will autoupdate based on state
      //   shields = newShields //so will shields
      
      
      
      
      // figure out which features should be in here and which should be on the app.
        // If text is displayed elsewhere, info needs to feedback to parent so it can passdown to other components
        // 1)Increment turnCount - if turn is less than 0 output text 3 2 1 GO
        // 2)Copy out state and using the copy:
        // 3)set both players' previousMovePlayed to CurrentMovePlayed
        // 4)set both players' currentMovePlayed to null 
        // 5)update life and charge according to the CurrentMovePlayed
        // 6)Check for game ended(life = 0) if so trigger endGame function
        // 7)this.setState({oldState: newState})
    
  
    componentDidMount(){
      this.timerId = setInterval(()=>this.tick(), 1000);
      window.addEventListener("keydown", this.handleKeyPress);
    }
  
    componentWillUnmount(){
      clearInterval(this.timerId);
      window.removeEventListener("keydown", this.handleKeyPress);
    }
  
    render() {
      return (
        <div>
          <p>{this.state.displayTime < 1 && Math.abs(this.state.displayTime)}</p>
        </div>
      );
    }
  }

  // componentDidMount() {
  //   // Add keydown event listener
  //   window.addEventListener("keydown", this.handleKeyPress);
  // }

  // componentWillUnmount() {
  //   // Remove keydown event listener when the component unmounts
  //   window.removeEventListener("keydown", this.handleKeyPress);
  // }

  // handleKeyPress = (event) => {
  //   // Get the pressed key (letter) from the event
  //   const letter = event.key.toUpperCase();

  //   // Check if the key pressed is a valid letter
  //   if (/^[A-Z]$/.test(letter)) {
  //     if (!this.state.guessedLetters.includes(letter)) {
  //       // Only submit letters that havent been already pressed
  //       this.handleSubmit(event, letter);
  //     }
  //   }
  // };