import React from 'react'
import { Link } from 'react-router-dom'
import image from '../images/feed-large.png'

class Navbar extends React.Component {

  state = {
    selected: 'feed'
  }

  // TODO start selected value as the current page

  selectNavItem = event => {
    this.setState({ selected: event.target.innerHTML.toLowerCase() })
  }

  render() {
    const { selected } = this.state
    return (
      <nav className="navbar is-dark">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className={`nav-item ${selected === 'feed' ? 'is-selected' : ''}`} onClick={this.selectNavItem}>FEED</Link>
            <Link to="/browse" className={`nav-item ${selected === 'browse' ? 'is-selected' : ''}`} onClick={this.selectNavItem}>BROWSE</Link>
            <Link to="/top-stories" className={`nav-item ${selected === 'top stories' ? 'is-selected' : ''}`} onClick={this.selectNavItem}>TOP STORIES</Link>
          </div>
        </div>

        <img className='logo' src={image} alt='new-feed logo' />
      </nav>
    )
  }
}

export default Navbar



