import React from 'react'
import { getEverything, getSources } from '../lib/api'

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

    this.setState({ 
      articles: response.data.articles, 
      formActive: false
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
      // Error message -> no source matching tht name
      const matchesArray = this.findMatchingSources(event.target.value)
      suggestions = matchesArray.map(source => source.name)
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

  render() {
    return (
      <>
        <div className="browse-outercontainer">
          <Filter params={this.state.params} suggestions={this.state.suggestions} formActive={this.state.formActive} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleAutocomplete={this.handleAutocomplete} />
          {!this.state.formActive && 
          <div className="container column is-full box redisplay-form">
            <div>Current filters: {this.state.params.}</div>
            <button className="button is-primary is-active">Back to filters</button>
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