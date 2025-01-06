import { useState } from 'react'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)
   
  const setRandom = (anecdotes) => {
    const value = getRandomInt(anecdotes.length)
    setSelected(value)
  }

  const vote = () => {
    const temp = { ...points }
    temp[selected] += 1
    setPoints(temp)

    if (temp[selected] >= temp[mostVoted]) {setMostVoted(selected)}

  }



  return (
    <div>
    <h1>Anecdote of the Day</h1>
    <p>{anecdotes[selected]}</p> 
    has {points[selected]} votes
    <br />
    
    <Button handleClick={() => setRandom(anecdotes)} text="Next anecdote"/>
    <Button handleClick={() => vote()} text="Vote"/>

    <h1>Anecdote with most votes</h1>
    <p>{anecdotes[mostVoted]}</p>
    has {points[mostVoted]} votes
    
    </div>
  )
}

export default App