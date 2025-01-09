import React from 'react'
import { Link } from 'react-router-dom'
function About() {
  return (
    <div>
      <h2>About</h2>
      <Link to={'/home'}>Home</Link>
      <Link to={'/about'}>About</Link>
    </div>
  )
}

export default About
