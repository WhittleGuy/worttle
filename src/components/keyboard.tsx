interface KeyboardProps {
  correct: string[]
  contained: string[]
  incorrect: string[]
  handleClick: (l: string) => void
}

const Keyboard = (props: KeyboardProps) => {
  const { correct, contained, incorrect, handleClick } = props

  const classAdd = (l: string) => {
    if (correct.includes(l)) return 'keyboard-key correct'
    else if (contained.includes(l)) return 'keyboard-key contained'
    else if (incorrect.includes(l)) return 'keyboard-key incorrect'
    else return 'keyboard-key'
  }

  const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
  ]
  const topRow = keys.slice(0, 10)
  const midRow = keys.slice(10, 19)
  const botRow = keys.slice(19)
  return (
    <div className="keyboard">
      <div className="keyboard-row">
        {topRow.map((l) => {
          return (
            <p
              className={classAdd(l)}
              onClick={(e) => {
                handleClick(l)
              }}
            >
              {l}
            </p>
          )
        })}
      </div>
      <div className="keyboard-row">
        {midRow.map((l) => {
          return (
            <p
              className={classAdd(l)}
              onClick={(e) => {
                handleClick(l)
              }}
            >
              {l}
            </p>
          )
        })}
      </div>
      <div className="keyboard-row">
        <p
          className="func-button keyboard-key"
          onClick={(e) => {
            handleClick('submit')
          }}
        >
          ENTER
        </p>

        {botRow.map((l) => {
          return (
            <p
              className={classAdd(l)}
              onClick={(e) => {
                handleClick(l)
              }}
            >
              {l}
            </p>
          )
        })}
        <p
          className="func-button keyboard-key"
          onClick={(e) => {
            handleClick('clear')
          }}
        >
          ⌫
        </p>
      </div>
    </div>
  )
}

export default Keyboard
