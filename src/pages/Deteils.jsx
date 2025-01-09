import React from 'react'
import { Link } from 'react-router-dom'
function Deteils() {
  return (
    <div>
      Deteils
      <Link to={'/about'}>About</Link>
      <Link to={'/deteils'}>Details</Link>

    </div>
  )
}

export default Deteils
