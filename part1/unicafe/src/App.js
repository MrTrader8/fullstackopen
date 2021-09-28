import React, { useState } from 'react'

// a proper place to define a component
const Statistics = (props) => {
  if (props.good + props.bad + props.neutral === 0 ){
    return(<p>No Feedback Given </p>)
  } 
  return(
    <div>
      <h2> statistics </h2>
      <StatisticLine text="good" value={props.good}/>
      <StatisticLine text="neutral" value={props.neutral}/>
      <StatisticLine text="bad" value={props.bad}/>
      <StatisticLine text="all" value={props.good + props.bad + props.neutral}/>
      <StatisticLine text="average" value={avg(props.good,props.bad,props.neutral)}/>
      <StatisticLine text="positive" value={positive(props.good,props.bad,props.neutral)}/>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)



  return (
    <div>
      <h1> Give Feedback </h1>
      <Button onClick={increaseGood} text="good"/>
      <Button onClick={increaseNeutral} text="neutral"/>
      <Button onClick={increaseBad} text="bad"/>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

const StatisticLine = (props) => (
  <p> {props.text} {props.value}</p>
)

const avg = (good,bad,neutral) => {

  if(good + bad + neutral === 0){
    return 0
  }
  return ((good + (bad * (-1)))/(good + neutral + bad))
}

const positive = (good,bad,neutral) => {

  if(good + bad + neutral === 0){
    return 0 + "%"
  }
  return ((good/(good + neutral + bad))* 100) + "%"
}

const Button = (props) => (
  <button onClick={props.onClick}>{props.text}</button>
)

export default App