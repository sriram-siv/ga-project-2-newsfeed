import React from 'react'
import { getEverything } from '../lib/api'

import NewsCard from './NewsCard'

class Browse extends React.Component {
  
  state = {
    params: {
      query: 'brexit'
    },

    articles: []
  }

  async componentDidMount() {
    const response = await getEverything(this.state.params)
    this.setState({ articles: response.data.articles })
  }

  render() {
    return (
      <div className="news-grid">
        {this.state.articles.map((article, i) => <NewsCard key={i} {...article}/> )}
      </div>
    )
  }
}

export default Browse