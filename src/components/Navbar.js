import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  

  return (
    <nav className="navbar is-dark">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">Home</Link>
          <Link to="/browse" className="navbar-item">Browse</Link>
        </div>
        <div className="navbar-end">

        </div>
      </div>
    </nav>
  )


}

export default Navbar