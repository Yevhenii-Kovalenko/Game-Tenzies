import React, { useEffect } from 'react';
import './App.css';
import Die from './Die';
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice,setDice] = React.useState(allNewDice())
  const [tenzies,setTenzies] = React.useState(false)

  useEffect(() =>{
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue){
      setTenzies(true)
      console.log('You won');
    }
    
  },[dice])

  function genereteNewDie(){ 
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }
  function allNewDice(){   //функція повертає масив з рандомними числами
    const newDice = []
    for(let i = 0; i < 10;i++){
      newDice.push(genereteNewDie())
    }
    return newDice
  }
  

  function holdDice(id){  // зберігає квадрат
    setDice(oldDice => oldDice.map(die =>{
      return die.id === id ? 
      {...die,isHeld: !die.isHeld} : 
      die
    }))
  }

  const diceElements = dice.map(die =>  // компонент Die і його параметри
        <Die key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
        ) 

  function rollDice(){   //функція міняє квадрати на інші
    if(!tenzies){
      setDice(oldDice => oldDice.map(die =>{
        return die.isHeld ? 
              die : 
              genereteNewDie()
      }))
    } else{
      setTenzies(false)
      setDice(allNewDice())
    }
  }


  return (
    <main>
    {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
    <div className="dice-container">
      {diceElements}
    </div>
    <div className='btn-container'>
      <button onClick={rollDice} className='dice-btn'>{tenzies ? "New game" : "Roll"}</button>
    </div>
    </main>
  );
}

export default App;
