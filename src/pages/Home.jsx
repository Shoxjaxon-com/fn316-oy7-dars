import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='conteiner'>
      <div className="nav-list">
        <h2>Home</h2>
        <ul className="nav-item">
            <li className="nav-lists"><Link to={'/about'}>About</Link></li>
            <li className="nav-lists"><Link to={'/deteils'}>Details</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Home
