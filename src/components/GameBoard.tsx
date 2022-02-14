import LetterRow from './LetterRow'

interface GameBoardProps {
  guesses: string[][]
  accuracy: string[][]
  complete: boolean | null
  word: string
}

/**
 * Generate all 6 rows of letter tiles
 * @param guesses
 * @param accuracy
 * @returns JSX.Element[ ]
 */
const generateRows = (guesses: string[][], accuracy: string[][]) => {
  let output = []

  for (let i = 0; i < 6; i++) {
    if (i > guesses.length - 1) {
      output.push(<LetterRow letters={[]} status={[]} />)
    } else output.push(<LetterRow letters={guesses[i]} status={accuracy[i]} />)
  }

  return output
}

/**
 * Generate spoiler-free square display for end of game
 * @param status
 * @returns
 */
const generateCompleteTable = (status: string[][]) => {
  const table = []
  for (const stat of status) {
    let row = ''
    for (const s of stat) {
      if (s === 'correct') {
        row += '🟩'
      }
      if (s === 'absent') {
        row += '⬛'
      }
      if (s === 'present') {
        row += '🟨'
      }
    }
    table.push(row)
  }
  return table.map((row) => <p className="table-row">{row}</p>)
}

const GameBoard = (props: GameBoardProps) => {
  const { guesses, accuracy, complete, word } = props

  return (
    <>
      {complete !== null ? (
        <div className="gameboard">
          {generateRows(guesses, accuracy).map((row) => row)}
          <div className="complete">
            <h1>{complete ? 'You got it!' : 'Uh oh...'}</h1>
            <h4>The word was {word}</h4>
            <div className="table">{generateCompleteTable(accuracy)}</div>
            <button
              className="complete-button"
              onClick={() => location.reload()}
            >
              New Game
            </button>
          </div>
        </div>
      ) : (
        <div className="gameboard">
          {generateRows(guesses, accuracy).map((row) => row)}
        </div>
      )}
    </>
  )
}

export default GameBoard
