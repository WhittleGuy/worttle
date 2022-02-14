import { useEffect, useState } from 'react'
import './App.css'
import GameBoard from './components/GameBoard'
import Keyboard, { keys } from './components/keyboard'
import { WORDS } from './words'

const WORD = WORDS[Math.floor(Math.random() * WORDS.length)]
  .toUpperCase()
  .split('')

const listener = window.addEventListener('keydown', (e) => {
  const key = e.key.toUpperCase()
  return key
})

const App = () => {
  const [keyboardEnabled, setKeyboardEnabled] = useState(true)
  const [correct, setCorrect] = useState<string[]>([])
  const [present, setPresent] = useState<string[]>([])
  const [absent, setAbsent] = useState<string[]>([])
  const [currentGuess, setCurrentGuess] = useState<string[]>([])
  const [guesses, setGuesses] = useState<string[][]>([])
  const [accuracy, setAccuracy] = useState<string[][]>([])
  const [complete, setComplete] = useState<boolean | null>(null)
  const [attempts, setAttempts] = useState(0)

  /**
   * Function passed to keyboard to handle state changes by key presses
   * @param l
   * @returns void
   */
  const handleClick = (l: string): void => {
    // Keyboard is disabled
    if (!keyboardEnabled) return

    // Clear a letter from currentGuess only if letters are present
    if (l === 'clear' && currentGuess.length > 0) {
      setCurrentGuess(currentGuess.slice(0, -1))
    }
    // Add pressed letter to currentGuess
    else if (l !== 'clear' && l !== 'submit') {
      if (currentGuess.length === 5) return
      setCurrentGuess([...currentGuess, l])
    }

    // Submit guess
    else if (currentGuess.length === 5 && l === 'submit') {
      let cor: string[] = [] // Temporary correct letters array
      let abs: string[] = [] // Temporary absent letters array
      let pre: string[] = [] // Temporary present letters array
      let acc: string[] = [] // Temporary letter accuracy array
      let winner = true // Assume correct answer

      // Check currentGuess against WORD
      for (let i = 0; i < 5; i++) {
        // Letter is correct
        if (currentGuess[i] === WORD[i]) {
          if (!cor.includes(currentGuess[i])) cor.push(currentGuess[i])
          acc.push('correct')
        }
        // Letter is present
        else if (WORD.join('').includes(currentGuess[i])) {
          if (!pre.includes(currentGuess[i])) pre.push(currentGuess[i])
          acc.push('present')
          winner = false
        }
        // Letter is absent
        else {
          if (!abs.includes(currentGuess[i])) abs.push(currentGuess[i])
          acc.push('absent')
          winner = false
        }
      }

      // All letters were correct
      if (winner) {
        setComplete(true)
        setKeyboardEnabled(false)
      }
      // Maximum attempts used
      else if (attempts + 1 === 6) {
        setComplete(false)
        setKeyboardEnabled(false)
      }

      setAttempts(attempts + 1) // Add attempt
      setAccuracy([...accuracy, acc]) // Add accuracy array
      setGuesses([...guesses, currentGuess]) // Add guess to list of guesses
      setCurrentGuess([]) // Reset current guess
      setCorrect([...correct, ...cor]) // Update correct letters
      setAbsent([...absent, ...abs]) // Update absent letters
      setPresent([...present, ...pre]) // Update present letters
    }
  }

  return (
    <div className="App">
      <div className="gameboard-container">
        <GameBoard
          guesses={
            guesses.length > 0 ? [...guesses, currentGuess] : [currentGuess]
          }
          accuracy={accuracy}
          complete={complete}
          word={WORD.join('')}
        />
      </div>
      <Keyboard
        correct={correct}
        absent={absent}
        present={present}
        handleClick={handleClick}
      />
    </div>
  )
}

export default App
