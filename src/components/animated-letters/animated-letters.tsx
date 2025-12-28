import './animated-letters.scss'

type AnimatedLettersProps = {
  letterClass: string
  strArray: string[]
  idx: number
}

const AnimatedLetters = ({ letterClass, strArray, idx }: AnimatedLettersProps) => (
  <span>
    {strArray.map((char, i) => (
      <span key={char + i} className={`${letterClass} _${i + idx}`}>
        {char}
      </span>
    ))}
  </span>
)

export default AnimatedLetters
