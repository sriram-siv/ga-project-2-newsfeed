import React from 'react'

import NewsCard from './NewsCard'

class SectionScroll extends React.Component {

  state = {
    collapsed: false
  }

  collapseSection = () => {
    this.setState({ collapsed: true })
  }

  render() {
    const { query, type, removeSub } = this.props
    
    return (
      <div className={`section-container ${this.state.collapsed ? 'collapsed' : ''}`}>
        <div className="keyword-heading">{query.q.toUpperCase()}<span onClick={() => {
          this.collapseSection()
          removeSub(type, query.q)
        }}>remove</span></div>
        <div className="section-scroll">
          <div className='news-scroll'>
            {query.articles.map((article, i) => <NewsCard key={i} {...article} />)}
          </div>
        </div>
      </div>
    )
  }
}

export default SectionScroll