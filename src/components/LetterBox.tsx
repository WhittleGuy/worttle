import { useState } from 'react'

interface LetterBoxProps {
  letter: string
  status: string
}

const LetterBox = (props: LetterBoxProps) => {
  const { letter, status } = props

  const classAdd = (status: string) => {
    if (status === 'correct') return 'letter-box correct'
    else if (status === 'absent') return 'letter-box absent'
    else if (status === 'present') return 'letter-box present'
    else return 'letter-box'
  }

  return <div className={classAdd(status)}>{letter}</div>
}

export default LetterBox
