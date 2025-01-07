const Course = (props) => {
    return (
      <div>
        <Header course={props.course.name}/>
        <Content parts={props.course.parts}/>
        <Total parts={props.course.parts}/>
      </div>
    )
}

const Header = (props) => {
    return (
    <div>
      <h2>{props.course}</h2>
    </div>
    )
  
}

const Content = (props) => {

    const parts = props.parts
    return (
    
    <div>
      {parts.map(part =>
          
          <Part key = {part.id} part={part.name} exercises={part.exercises} />
        )}
  
    </div>
    
    )
}

const Part = (props) => {
    return (
      <div>
      <p>
      {props.part} {props.exercises}
      </p>
      </div>
    )
}

const Total = (props) => {
    const initialVal = 0
  
    const total = props.parts.reduce( (s, p) => 
      s + p.exercises, initialVal
    )
  
    return (
    <div>
      <b><p>Total of {total} exercises</p></b>
    </div>
    )
}

export default Course