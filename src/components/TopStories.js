import React from 'react'

import NewsCard from './NewsCard'
import SubNavBtns from './SubNavBtns'
import { getTopStories } from '../lib/api'

class TopStories extends React.Component{
  state= {
    stories: null,
    selected: 'general'
  }

  async componentDidMount() {
    const response = await getTopStories('general')
    this.setState({
      stories: response.data
    })
  }

  handleClick = async event =>{
    const response = await getTopStories(event.target.textContent)
    
    this.setState({
      stories: response.data
    })
    
  }

  render(){
    
    return (
      <>
        <div className="header"></div>
        <div className="navbar topstory-nav form-container" role="navigation" aria-label="sub navigation">
          <div className="navbar-brand">
            <SubNavBtns onClick={this.handleClick} className="button is-large"/>
            {/* <button onClick={this.handleClick} className="button is-large">General</button>
            <button onClick={this.handleClick} className="button is-large">Business</button>
            <button onClick={this.handleClick} className="button is-large">Technology</button>
            <button onClick={this.handleClick} className="button is-large">Entertainment</button>
            <button onClick={this.handleClick} className="button is-large">Health</button>
            <button onClick={this.handleClick} className="button is-large">Sport</button> */}
          </div>
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