import LetterBox from './LetterBox'

interface LetterRowProps {
  letters: string[]
  status: string[]
}

const generateBoxes = (letters: string[], status: string[]) => {
  const output = []

  for (let i = 0; i < 5; i++) {
    if (i > letters.length - 1) output.push(<LetterBox letter="" status="" />)
    else {
      if (status === undefined || i > status?.length - 1) {
        output.push(<LetterBox letter={letters[i]} status="" />)
      } else output.push(<LetterBox letter={letters[i]} status={status[i]} />)
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
