import React from 'react'

class Home extends React.Component {
  render() {
    return (
      <section className="hero is-fullheight-with-navbar is-info is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1 has-text-centered has-text-black">
              News Feed
              {/* <span role="img" aria-label="cheese emoji">🧀</span> */}
            </h1>
          </div>
        </div>
      </section>
    )
  }
}

export default Home