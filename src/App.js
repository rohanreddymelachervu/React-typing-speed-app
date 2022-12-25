import React, {useState, useRef} from 'react'
import randomWords from 'random-words'
import './App.css'
import Timer from './Timer.js'
const NUM_OF_WORDS = 60

function Word(props){
  const {text, active, correct} = props
  if(correct===true){
    return <span className="correct">{text} </span>
  }
  if(correct===false){
    return <span className="incorrect">{text} </span>
  }
  if(active){
    return <span className="active">{text} </span>
  }
  return <span>{text} </span>
}

function generateWords(){
  return new Array(NUM_OF_WORDS).fill(null).map(() => randomWords())
}
Word = React.memo(Word)
function App() {
  const [userInput, setUserInput] = useState('')
  const cloud = useRef(generateWords())
  const [activeWordIndex, setActiveWordIndex] = useState(0)
  const [correctWordArray, setCorrectWordArray] = useState([])
  const [startCounting, setStartCounting] = useState(false)

  function processInput(value){
    if(activeWordIndex === cloud.current.length){
      return
    }
    if(!startCounting){
      setStartCounting(true)
    }
    if(value.endsWith(' ')){
      //User finished the word
      if(activeWordIndex === cloud.current.length-1){
        setStartCounting(false)
        setUserInput("Time completed")
      }else{
        setUserInput('')
      }
      setActiveWordIndex(index => index + 1)
      const word = value.trim()
        setCorrectWordArray((data) => {
          const newResult = [...data]
          newResult[activeWordIndex] = word === cloud.current[activeWordIndex]
          return newResult
        })
      }
    else{
      setUserInput(value)
    }
  }
  return (
    <div>
      <h1>Typing Test</h1>
      <Timer startCounting={startCounting} correctWords={correctWordArray.filter(Boolean).length}/>
      <p>{cloud.current.map((word,index) => {
          return <Word text={word} active={index === activeWordIndex} correct={correctWordArray[index]} />
      })}</p>
      <input type="text" value={userInput}
      onChange={(e) => processInput(e.target.value)} placeholder="Start typing..."/>
    </div>
  );
}

export default App;
