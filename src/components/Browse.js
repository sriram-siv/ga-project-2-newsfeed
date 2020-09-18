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
      const split = wordSearched.split(' ')
      return split.every(word => source.id.match(new RegExp(word, 'i')))
      
      wordSearched.replace(' ', '\s')
    })
    return matches
  }
  
  handleSubmit = async (event) => {

    // TODO Show error message to user
    if (this.state.params.sourceName !== '' && this.state.params.source === '') {
      console.log('no source matching..')
    }

    event.preventDefault()
    const response = await getEverything(this.state.params)
    console.log(response)
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
      // Remove matched source if user edits the input field
      params.source = ''
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

  handleBlur = () => {
    this.setState({ suggestions: null })
  }

  addToFeed = (param) => {
    if (param === 'query') saveKeyword(this.state.params.query)

    popupNotification('Added in Feed')
  }

  render() {
    return (
      <>
        <div className="header"></div>
        <div className="browse-outercontainer">
          <Filter params={this.state.params}
            suggestions={this.state.suggestions}
            formActive={this.state.formActive}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleAutocomplete={this.handleAutocomplete}
            handleBlur={this.handleBlur} />
          {!this.state.formActive && 
          <div className={`columns form-container 
            ${this.state.formActive ? 'form-nondisplay' : 'form-display'}`}
          >
            <div className="column is-full box redisplay-form"
              autoComplete="off">
              <button onClick={this.redisplayForm} 
                className="button is-fullwidth to-filters">
                  BACK TO FILTERS
              </button>
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
          </div>
          }
          {/* <div className={`${(this.state.articles.length === 0) ?
            'loading active' : 'loading'}`}>
            {`${this.state.articles.length} ${this.state.formActive}`}
            LOADING</div> */}
        </div>
        <div className="news-grid">
          {this.state.articles.length > 0 && this.state.articles.map((article, i) => <NewsCard key={i} {...article}/> )}
        </div>

      </>
    )
  }
}

export default Browse