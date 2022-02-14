import LetterRow from './LetterRow'

interface GameBoardProps {
  guesses: string[][]
  status: string[][]
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

const GameBoard = (props: GameBoardProps) => {
  const { guesses, status } = props

  return (
    <div className="gameboard">
      {generateRows(guesses, status).map((row) => row)}
    </div>
  )
}

export default GameBoard
