import React from 'react'

import NewsCard from './NewsCard'
import { getTopStories } from '../lib/api'

class TopStories extends React.Component{
  state= {
    stories: null
  }

  async componentDidMount() {
    const response = await getTopStories()
    console.log(response)

    this.setState({
      stories: response.data
    })

    setTimeout(() => console.log(this.state.stories.articles), 3000)
 

  }

  render(){
    
    if (!this.state.stories) return null
    return (
      <div className='outer-top-stories'>
        <div className="news-grid">
          <h3 className="keyword-heading">Business</h3>
          {this.state.stories.articles.map((article, i) => <NewsCard key={i} {...article} />)}
          {/* <div>{this.state.stories.articles.map((article, index) => <div key={index}>{article}</div>)}</div> */}
          
        </div>
      </div> 

    )

  }


}

export default TopStories