import React from 'react'

import NewsCard from './NewsCard'
import SubNavBtns from './SubNavBtns'
import { getTopStories } from '../lib/api'

class TopStories extends React.Component{
  state= {
    stories: null,
    selected: 'general',
    loading: true
  }

  async componentDidMount() {
    const response = await getTopStories('general')
    this.setState({
      stories: response.data,
      loading: false
    })
  }

  handleClick = event =>{

    this.handleLoad(event)
  }

  handleLoad = async event =>{
    const response = await getTopStories(event.target.textContent)
    
    this.setState({
      stories: response.data,
      loading: false
    })
  }

  render(){
    
    return (
      <>
        <section id={!this.state.loading && 'topstories-loading'}>
          <div className="header"></div>
          <div className="navbar form-container" role="navigation" aria-label="sub navigation">
            <div className="navbar-brand">
              <SubNavBtns onClick={this.handleClick} className="button is-large"/>
            </div>
          </div>
          <div className='outer-top-stories'>
            <div className="loading" id={this.state.loading && 'is-loading'}>LOADING</div>
            <div className="news-grid">
              {this.state.stories && this.state.stories.articles.map((article, i) => <NewsCard key={i} {...article} />)}
            </div>
          </div> 
        </section>
      </>
    )
  }


}

export default TopStories