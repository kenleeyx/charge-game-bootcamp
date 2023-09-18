import React from 'react';

export function Movelist(props) {
    //takes in movelist and current energy - need to convert that to the table
    const moveRows = Object.values(props.moves).map((move)=>
        <tr key = {move.name} className = {`${props.charge < move.chargeCost ? 'text-gray-600': 'text-white'}`}>
            <td>{props.playerName === "playerOne" ? move.p1keyboard : move.p2keyboard}</td>
            <td>{move.name}</td>
            <td>{move.chargeCost}</td>
            <td>{move.desc}</td>
        </tr>
    )
    return(
        <table className = "bg-green-500">
              <tr>
                <th>Key</th>
                <th>Move</th>
                <th>Charge</th>
                <th>Effect</th>
              </tr>
              {moveRows}
          </table>
    )
}   

