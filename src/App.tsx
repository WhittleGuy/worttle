import { useState } from 'react'
import './App.css'
import GameBoard from './components/GameBoard'
import Keyboard from './components/keyboard'

const WORD = 'TRUST'.split('')

function App() {
  const [correct, setCorrect] = useState<string[]>([])
  const [contained, setContained] = useState<string[]>([])
  const [incorrect, setIncorrect] = useState<string[]>([])
  const [letters, setLetters] = useState<string[]>([])
  const [guesses, setGuesses] = useState<string[][]>([])
  const [status, setStatus] = useState<string[][]>([[]])

  const handleClick = (l: string) => {
    if (letters.length === 5 && l !== 'clear' && l !== 'submit') return
    if (l === 'clear' && letters.length > 0) setLetters(letters.slice(0, -1))
    else if (l !== 'clear' && l !== 'submit') setLetters([...letters, l])
    else if (letters.length === 5 && l === 'submit') {
      let cor: string[] = []
      let incor: string[] = []
      let con: string[] = []
      let stats: string[] = []
      for (let i = 0; i < 5; i++) {
        console.log(letters[i], WORD[i])
        if (letters[i] === WORD[i] && !cor.includes(letters[i])) {
          cor.push(letters[i])
          stats.push('correct')
        } else if (
          letters[i] !== WORD[i] &&
          WORD.join('').includes(letters[i]) &&
          !con.includes(letters[i])
        ) {
          con.push(letters[i])
          stats.push('contained')
        } else if (!incor.includes(letters[i])) {
          incor.push(letters[i])
          stats.push('incorrect')
        }
      }
      setStatus([...status, stats])
      setGuesses([...guesses, letters])
      setStatus([])
      setLetters([])
      setCorrect([...correct, ...cor])
      setIncorrect([...incorrect, ...incor])
      setContained([...contained, ...con])
      console.log(correct)
      console.log(incorrect)
      console.log(contained)
    }
  }

  return (
    <div className="App">
      <div className="gameboard-container">
        <GameBoard
          guesses={guesses.length > 0 ? [...guesses, letters] : [letters]}
          status={status}
        />
      </div>
      <Keyboard
        correct={correct}
        incorrect={incorrect}
        contained={contained}
        handleClick={handleClick}
      />
    </div>
  )
}

export default App
