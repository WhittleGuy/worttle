import LetterBox from './LetterBox'

interface LetterRowProps {
  letters: string[]
  status: string[]
}

const generateBoxes = (letters: string[], status: string[]) => {
  const output = []

  for (let i = 0; i < 5; i++) {
    // No letter in space
    if (i > letters.length - 1) output.push(<LetterBox letter="" status="" />)
    // Letter is in array
    else {
      // Status not yet defined (Answer not submitted)
      if (status === undefined) {
        output.push(<LetterBox letter={letters[i]} status="" />)
      }
      // Word has been submitted
      else output.push(<LetterBox letter={letters[i]} status={status[i]} />)
    }
  }

  return output
}

const LetterRow = (props: LetterRowProps) => {
  const { letters, status } = props

  return (
    <div className="letter-row">
      {generateBoxes(letters, status).map((box) => box)}
    </div>
  )
}

export default LetterRow
