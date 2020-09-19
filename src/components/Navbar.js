import React from 'react'
import { Link } from 'react-router-dom'

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
    // <div className="link-border"></div>  <- in link
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/" className={`nav-item ${selected === 'feed' ? 'is-selected' : ''}`} onClick={this.selectNavItem}>FEED</Link>
          <Link to="/browse" className={`nav-item ${selected === 'browse' ? 'is-selected' : ''}`} onClick={this.selectNavItem}>BROWSE</Link>
          <Link to="/top-stories" className={`nav-item ${selected === 'top stories' ? 'is-selected' : ''}`} onClick={this.selectNavItem}>TOP STORIES</Link>
        </div>
      </nav>
    )
  }
}

export default Navbar



