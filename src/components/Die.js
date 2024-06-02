import React from "react";
function Die(props) {
    let style = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    } 
    return (
        <button onClick={props.holdDice} style={style}>{props.value}</button>
    )
}


export default Die;