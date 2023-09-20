import React from 'react';


//<ChargeCounter value={this.state.playerOne.charge} gamePhase = {this.state.gamePhase}/>
export function ChargeCounter(props) {
    if (props.gamePhase !== "main") {
        return(
            <div className = 'h-20'>
                <p className = 'text-4xl p-5'>{'⚡'.repeat(props.value)}</p>
            </div>
        )
    } else {
        return
    }
    
}   