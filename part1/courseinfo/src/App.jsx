const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  console.log('content', props);
  return (
    <>
      {props.parts.map(({name, exercises}, idx) => <Part key={idx} name={name} exercises={exercises} />)}
    </>
  )
}

const Part = (props) => {
  console.log('part', props);

  const {name, exercises} = props;
  return (
    <>
      <p>{name} {exercises}</p>
    </>
  )
}

const Total = (props) => {
  console.log('total', props);
  return (
    <>
      <p>Number of exercises {props.exercises.reduce((sum, val) => sum + val)}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ]
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map(({exercises}) => exercises)} />
    </div>
  )
}

export default App
