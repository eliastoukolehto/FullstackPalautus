import { useState } from 'react'




const StatisticsLine = (props) => {
  return (

      <tr><td>{props.text} </td><td>{props.value}</td></tr>

  )
}

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad

  const all = good + bad + neutral
  const avg = (good - bad)/all
  const positivePercent = (good/all)*100 + ' %'

  if(all === 0) {
    return (
      <div>

        <p>No feedback given</p>
      </div>
    )
  }
    return (
    <table>
      <tbody>
      <StatisticsLine text="Good:" value={good}/>
      <StatisticsLine text="Neutral:" value={neutral}/>
      <StatisticsLine text="Bad:" value={bad}/>
      <StatisticsLine text="All::" value={all}/>
      <StatisticsLine text="Average:" value={avg}/>
      <StatisticsLine text="Positive:" value={positivePercent}/>
      </tbody>
    </table>
    )
  
} 

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>

      <h1>Give Feedback</h1>

      <Button handleClick={() => setGood(good + 1)}  text="Good"/>
      <Button handleClick={() => setNeutral(neutral + 1)}  text="Neutral"/>
      <Button handleClick={() => setBad(bad + 1)}  text="Bad"/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App