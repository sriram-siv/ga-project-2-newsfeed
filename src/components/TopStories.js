import React from 'react'

import { getTopStories } from '../lib/api'

import NewsCard from './NewsCard'
import SubNav from './SubNav'

class TopStories extends React.Component{

  state = {
    categories: [
      'GENERAL',
      'BUSINESS',
      'TECHNOLOGY',
      'ENTERTAINMENT',
      'HEALTH',
      'SPORT'
    ],
    stories: null,
    selected: 'GENERAL',
    loading: true
  }

  async componentDidMount() {
    const response = await getTopStories('general')
    
    this.setState({
      stories: response.data,
      loading: false
    })
  }

  handleClick = event => {
    const category = event.target.innerHTML

    this.setState({
      selected: category,
      stories: null,
      loading: true
    }, async () => {
      const response = await getTopStories(category)
      this.setState({
        stories: response.data,
        loading: false
      })
    })
  }

  render() {
    const { loading, selected, categories, stories } = this.state
    
    return (
      <>
        <div className="header"></div>
        <SubNav categories={categories} selected={selected} handleClick={this.handleClick} />
        <div className="top-stories-banner" id={loading ? 'top-stories-loading' : ''}>
          <h2><em>TOP STORIES</em></h2>
          <p>from around the world</p>
          <div className="loading" id={loading ? 'is-loading' : ''}>LOADING</div>
        </div>
        <div className="news-grid">
          {stories && stories.articles.map((article, i) => <NewsCard key={i} {...article} />)}
        </div>
      </>
    )
  }
}

export default TopStories