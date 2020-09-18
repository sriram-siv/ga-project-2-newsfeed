import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <nav className="navbar is-dark">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">FEED</Link>
          <Link to="/browse" className="navbar-item">BROWSE</Link>
          <Link to="/top-stories" className="navbar-item">TOP STORIES</Link>
        </div>
        <div className="navbar-end">

        </div>
      </div>
    </nav>
  )


}

export default Navbar