import React from 'react'
import { getEverything, getSources } from '../lib/api'
import { saveKeyword } from '../lib/feed'
import { popupNotification } from '../lib/notifications'

import NewsCard from './NewsCard'
import Filter from './Filter'

class Browse extends React.Component {
  
  state = {
    params: {
      query: '',
      source: '',
      sourceName: '' 
    },
    sources: null,
    articles: [],
    suggestions: [],
    formActive: true
  }

  async componentDidMount() {
    const response = await getSources()
    this.setState({ sources: response.data.sources })
  }


  findMatchingSources(wordSearched) {
    const matches = this.state.sources.filter(source => {
      const regex = new RegExp(wordSearched, 'i')
      return source.id.match(regex) 
    })
    return matches
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const response = await getEverything(this.state.params)
    console.log(response)
    // Error message -> no source matching tht name
    this.setState({ 
      articles: response.data.articles, 
      formActive: false
    })
  }

  redisplayForm = () => {
    this.setState({
      formActive: true
    })
  }

  handleChange = (event) => {
    const params = {
      ...this.state.params,
      [event.target.name]: event.target.value
    }

    let suggestions = this.state.suggestions
    
    if (event.target.name === 'sourceName' && this.state.sources) {
      // TODO on change delete param id
      // Regex not currently working with spaces
      const matchesArray = this.findMatchingSources(event.target.value)
      suggestions = matchesArray.map(source => source.name)

      if (!event.target.value){
        suggestions = null
      }
    }
    
    this.setState({
      params,
      suggestions
    })


  }

  handleAutocomplete = event => {
    let id, name
    for (let i = 0; i < this.state.sources.length; i++) {
      if (this.state.sources[i].name === event.target.innerHTML) {
        id = this.state.sources[i].id
        name = this.state.sources[i].name
      }
    }
    const params = {
      ...this.state.params,
      source: id,
      sourceName: name
    }
    this.setState({ params, suggestions: [] })
  }

  addToFeed = (param) => {
    if (param === 'query') saveKeyword(this.state.params.query)

    popupNotification('Added to feed')
  }

  render() {
    return (
      <>
        <div className="browse-outercontainer">
          <Filter params={this.state.params} 
            suggestions={this.state.suggestions} 
            formActive={this.state.formActive} 
            handleChange={this.handleChange} 
            handleSubmit={this.handleSubmit} 
            handleAutocomplete={this.handleAutocomplete} />
          {!this.state.formActive && 
          <div className="container column is-full box redisplay-form">
            <button onClick={this.redisplayForm} className="button is-fullwidth to-filters">Back to filters</button>
            <div className="current-filters">
              <h2>Current filters</h2>
              <div className="buttons are-small button-box">
                {this.state.params.query &&
                  <>
                    <p>{this.state.params.query}</p>
                    <button className="button add-feed" onClick={() => this.addToFeed('query')}>ADD TO FEED</button>
                    <br />
                  </>
                }
                {/* {this.state.params.source && <button className="button add-feed">{this.state.params.source}+</button>} */}
              </div>
            </div>
          </div>
          }
          <div className="news-grid">
            {this.state.articles.length > 0 && this.state.articles.map((article, i) => <NewsCard key={i} {...article}/> )}
          </div>  
        </div>
      </>
    )
  }
}

export default Browse