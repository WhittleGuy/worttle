import { useState } from 'react'
import './App.css'
import GameBoard from './components/GameBoard'
import Keyboard from './components/keyboard'
import { WORDS } from './words'

const WORD = WORDS[Math.floor(Math.random() * WORDS.length)]
  .toUpperCase()
  .split('')

function App() {
  const [correct, setCorrect] = useState<string[]>([])
  const [contained, setContained] = useState<string[]>([])
  const [incorrect, setIncorrect] = useState<string[]>([])
  const [letters, setLetters] = useState<string[]>([])
  const [guesses, setGuesses] = useState<string[][]>([])
  const [status, setStatus] = useState<string[][]>([])
  const [complete, setComplete] = useState<boolean | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [enabled, setEnabled] = useState(true)

  const handleClick = (l: string) => {
    if (!enabled) return
    if (letters.length === 5 && l !== 'clear' && l !== 'submit') return
    if (l === 'clear' && letters.length > 0) setLetters(letters.slice(0, -1))
    else if (l !== 'clear' && l !== 'submit') setLetters([...letters, l])
    else if (letters.length === 5 && l === 'submit') {
      let cor: string[] = []
      let incor: string[] = []
      let con: string[] = []
      let stats: string[] = []
      let winner = true
      for (let i = 0; i < 5; i++) {
        if (letters[i] === WORD[i]) {
          if (!cor.includes(letters[i])) cor.push(letters[i])
          stats.push('correct')
        } else if (
          letters[i] !== WORD[i] &&
          WORD.join('').includes(letters[i])
        ) {
          if (!con.includes(letters[i])) con.push(letters[i])
          stats.push('contained')
          winner = false
        } else {
          if (!incor.includes(letters[i])) incor.push(letters[i])
          stats.push('incorrect')
          winner = false
        }
      }
      console.log(stats)
      if (winner) {
        console.log('correct')
        setComplete(true)
        setEnabled(false)
      } else if (attempts + 1 === 6) {
        setComplete(false)
        setEnabled(false)
      }
      setAttempts(attempts + 1)
      setStatus([...status, stats])
      setGuesses([...guesses, letters])
      setLetters([])
      setCorrect([...correct, ...cor])
      setIncorrect([...incorrect, ...incor])
      setContained([...contained, ...con])
    }
  }

  return (
    <div className="App">
      <div className="gameboard-container">
        <GameBoard
          guesses={guesses.length > 0 ? [...guesses, letters] : [letters]}
          status={status}
          complete={complete}
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
