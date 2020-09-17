import React from 'react'
import { getEverything, getSources } from '../lib/api'

import NewsCard from './NewsCard'
import Filter from './Filter'

class Browse extends React.Component {
  
  state = {
    params: {
      query: 'brexit',
      source: ''
    },
    sources: {},
    articles: [],
    suggestions: []
  }

  async componentDidMount() {
    const articles = await getEverything(this.state.params)
    const sources = await getSources()
    console.log(articles)
    console.log(sources)
    this.setState({ articles: articles.data, sources: sources.data })
  }


  findMatchingSources(wordSearched, object){
    console.log(object.sources)
    const matches = object.sources.filter(source => {
      const regex = new RegExp(wordSearched, 'i')
      
      return source.id.match(regex) 
    })
    return matches
  }

  // displayMatches() {
  //   const matchesArray = 
  // } 

  handleSubmit = async (event) => {
    event.preventDefault()
    const response = await getEverything(this.state.params)
    console.log(response)

    this.setState({ articles: response.data.articles })
  }

  handleChange = (event) => {
    const params = {
      ...this.state.params,
      [event.target.name]: event.target.value
    }

    // this.setState({  })

    const matchesArray = this.findMatchingSources(event.target.value, this.state.sources)
    const newSuggestions = matchesArray.map(source => source.name)
    
    this.setState({
      params,
      suggestions: newSuggestions
    })


  }

  render() {
    return (
      <>
        <Filter params={this.state.params} suggestions={this.state.suggestions} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
        <div className="news-grid">
          {this.state.articles.length > 0 && this.state.articles.map((article, i) => <NewsCard key={i} {...article}/> )}
        </div>  
      </>
    )
  }
}

export default Browse