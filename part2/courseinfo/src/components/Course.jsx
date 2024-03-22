const Course = ({course: {name, parts}}) => {
  return (
    <>
      <Header course={name} />
      <Content parts={parts} />
      <Total exercises={parts.map(({exercises}) => exercises)} />
    </>
  )
}

const Header = ({course}) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map(({name, exercises}, idx) => <Part key={idx} name={name} exercises={exercises} />)}
    </>
  )
}

const Part = ({name, exercises}) => {
  return (
    <>
      <p>{name} {exercises}</p>
    </>
  )
}

const Total = ({exercises}) => {
  return (
    <>
      <p>
        <strong>
          Number of exercises {exercises.reduce((sum, val) => sum + val)}
        </strong>
      </p>
    </>
  )
}

export default Course;
