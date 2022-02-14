import LetterRow from './LetterRow'

interface GameBoardProps {
  guesses: string[][]
  status: string[][]
  complete: boolean | null
}

const generateRows = (guesses: string[][], status: string[][]) => {
  let output = []

  for (let i = 0; i < 6; i++) {
    if (i > guesses.length - 1) {
      output.push(<LetterRow letters={[]} status={[]} />)
    } else output.push(<LetterRow letters={guesses[i]} status={status[i]} />)
  }

  return output
}

const generateCompleteTable = (status: string[][]) => {
  const table = []
  for (const stat of status) {
    let row = ''
    for (const s of stat) {
      if (s === 'correct') {
        row += '🟩'
      }
      if (s === 'incorrect') {
        row += '⬛'
      }
      if (s === 'contained') {
        row += '🟨'
      }
    }
    table.push(row)
  }
  return table.map((row) => <p className="table-row">{row}</p>)
}

const GameBoard = (props: GameBoardProps) => {
  const { guesses, status, complete } = props

  return (
    <>
      {complete !== null ? (
        <div className="gameboard">
          {generateRows(guesses, status).map((row) => row)}
          <div className="complete">
            <h1>{complete ? 'You got it!' : 'Uh oh...'}</h1>
            <h4>The word was {guesses[guesses.length - 2]}</h4>
            <div className="table">{generateCompleteTable(status)}</div>
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
          {generateRows(guesses, status).map((row) => row)}
        </div>
      )}
    </>
  )
}

export default GameBoard
