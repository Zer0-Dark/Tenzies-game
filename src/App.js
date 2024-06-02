import React from 'react';
import './App.css';
import Die from './components/Die';
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
function App() {
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  //function that creates a 10 random numbers array
  function allNewDice() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      })
    }
    return arr
  }

  let [dicesNumbers, setDicesNumbers] = React.useState(allNewDice());
  //function to flip the dice


  let dices = dicesNumbers.map(die => <Die holdDice={() => holdDice(die.id)} id={die.id} key={die.id} value={die.value} isHeld={die.isHeld} ></Die>)
  function roll() {
    if (tenzies) {
      setDicesNumbers(allNewDice)
      setTenzies(false)
    } else {
      setDicesNumbers(oldDice => oldDice.map(
        die => {
          return die.isHeld ? die : generateNewDie()
        }
      ))
    }

  }


  function holdDice(id) {
    setDicesNumbers(oldDice => oldDice.map(
      dice => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : { ...dice }
      }
    ))
  }

  // win or not
  let [tenzies, setTenzies] = React.useState(false)
  React.useEffect(() => {
    let allHeld = dicesNumbers.every(die => die.isHeld === true)
    let firstVal = dicesNumbers[0].value
    let allSameValue = dicesNumbers.every(die => die.value === firstVal);
    if (allHeld && allSameValue === true) {
      setTenzies(true)
    }
  }, [dicesNumbers, tenzies])




  return (
    <div className="App">
      {tenzies && <Confetti />}
      <main className="main">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='die-container'>
          {dices}
        </div>
        <button className='roll' onClick={roll}>{tenzies ? "New Game" : "Roll"}</button>
      </main>
    </div>
  );
}

export default App;
