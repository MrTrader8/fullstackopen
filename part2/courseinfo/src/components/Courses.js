import React from 'react'

const Courses = ({courses}) => {
    return (
      <div>
        {courses.map(course =>
          <Course key={course.id} course={course}/>
        )}
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course={course}/>
        {course.parts.map(c => 
          <Part key={c.id} course={c}/>
        )}
        <Total course={course}/>
      </div>)
  }
  
  const Part = ({course}) => {
    return (
      <p>{course.name} {course.exercises}</p>
    )
  }
  
  const Header = ({course}) => {
    return (
      <h1> {course.name}</h1>
    )
  }
  
  const Total = ({course}) => {
    let total = course.parts.reduce((s,p) => {
      if (s >= 0) {
        return s + p.exercises
      }
      return s.exercises + p.exercises
    })
    return (
      <p>total of all courses {total}</p>
    )
  }

  export default Courses