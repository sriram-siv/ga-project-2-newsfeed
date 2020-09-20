import React from 'react'
import logo from '../images/feed-large-3page.png'

const Header = ({ feedActive, loading }) => {
  return (
    <div className='hero' id={!loading ? 'hero-loading' : ''}>
      <div className="hero-body header">
        <div className="container">
          <div className="title">
            <em>News Feed</em>
            <img src={logo} />
          </div>
          <p className="intro-blurb">browse - create - curate<br /> your own personalised news</p>
        </div>
        {feedActive
          ? <div className="loading" id={loading ? 'is-loading' : ''}>LOADING</div>
          : <div className="feed-empty">
            <h3>Your feed is empty right now <br /> Browse to add</h3>
          </div>}
      </div>
    </div>
  )
}

export default Header