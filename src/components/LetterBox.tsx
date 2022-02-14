import { useState } from 'react'

interface LetterBoxProps {
  letter: string
  status: string
}

const LetterBox = (props: LetterBoxProps) => {
  const { letter, status } = props

  const classAdd = (status: string) => {
    if (status === 'correct') return 'letter-box correct'
    else if (status === 'incorrect') return 'letter-box incorrect'
    else if (status === 'contained') return 'letter-box contained'
    else return 'letter-box'
  }

  return <div className={classAdd(status)}>{letter}</div>
}

export default LetterBox
