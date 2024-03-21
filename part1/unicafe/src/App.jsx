import { useState } from 'react'

const Button = ({handleClick, label}) => {
  return (
    <>
      <button onClick={handleClick}>{label}</button>
    </>
  )
}

const StatisticLine = ({category, value}) => {
  return (
    <tr>
      <td>{category}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, bad, neutral}) => {
  const all = good + neutral + bad;
  const average = ((good - bad) / all).toFixed(2);
  const positive = ((good * 100) / all).toFixed(2);

  if ([good, bad, neutral].every(val => val === 0)) {
    return (
      <>
        <p>No feedback given</p>
      </>
     )
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine category='good' value={good} />
          <StatisticLine category='neutral' value={neutral} />
          <StatisticLine category='bad' value={bad} />
          <StatisticLine category='all' value={all} />
          <StatisticLine category='average' value={average} />
          <StatisticLine category='positive' value={positive + '%'} />
        </tbody>
      </table>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(c => c + 1)} label='good' />
      <Button handleClick={() => setNeutral(c => c + 1)} label='neutral' />
      <Button handleClick={() => setBad(c => c + 1)} label='bad' />
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  )
}

export default App
