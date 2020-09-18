import React from 'react'

import NewsCard from './NewsCard'
import { getTopStories } from '../lib/api'

class TopStories extends React.Component{
  state= {
    stories: null
  }

  componentDidMount() {
    // const response = await getTopStories()

    // this.setState({
    //   stories: response.data
    // })

  }

  handleClick = async event =>{
    const response = await getTopStories(event.target.textContent)
    
    this.setState({
      stories: response.data
    })

    setTimeout(() => console.log(this.state.stories), 3000)
    
  }

  render(){
    
    // if (!this.state.stories) return null
    return (
      <>
        <div>
          <h3 className="keyword-heading">
            <button onClick={this.handleClick} className="button is-large">Business</button>
            <button onClick={this.handleClick} className="button is-large">Technology</button>
            <button onClick={this.handleClick} className="button is-large">Entertainment</button>
            <button onClick={this.handleClick} className="button is-large">Health</button>
            <button onClick={this.handleClick} className="button is-large">Sport</button>
          </h3>
        </div>
        <div className='outer-top-stories'>
          <div className="news-grid">
            {this.state.stories && this.state.stories.articles.map((article, i) => <NewsCard key={i} {...article} />)}
          </div>
        </div> 
      </>
    )

  }


}

export default TopStories