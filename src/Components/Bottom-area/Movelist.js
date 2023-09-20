import React from 'react';

export function Movelist(props) {
    //takes in movelist and current energy and converts to table form which tells players their controls
    const moveRows = Object.values(props.moves).map((move)=>
        <tr key = {move.name} className = {`font-aref m-10 ${props.charge < move.chargeCost ? 'text-gray-700': 'text-white'}`}>
            <td>{props.playerName === "playerOne" ? move.p1keyboard : move.p2keyboard}</td>
            <td>{move.name}</td>
            <td>{move.chargeCost === -1 ? '⚡' : move.chargeCost}</td>
            <td>{move.desc}</td>
        </tr>
    )
    return(
        <table className = "bg-slate-600 font-aref w-4/5">
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

