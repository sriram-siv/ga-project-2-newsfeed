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
    articles: []
  }

  async componentDidMount() {
    const articles = await getEverything(this.state.params)
    const sources = await getSources()
    console.log(articles)
    console.log(sources)
    this.setState({ articles: articles.data, sources: sources.data })
  }


  findMatchingSources(wordSearched, object){
    // const sources = object.data.articles
    console.log(object.sources)
    const matches = object.sources.filter(source => {
      const regex = new RegExp(wordSearched, 'i')
      
      return source.id.match(regex) 
    })

    console.log(matches)
    // return object.data.articles
    // const regex = new RegExp(wordSearched, 'gi')
    
  }

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

    this.setState({ params })

    this.findMatchingSources(event.target.value, this.state.sources)


  }

  render() {
    return (
      <>
        <Filter params={this.state.params} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        <div className="news-grid">
          {this.state.articles.length > 0 && this.state.articles.map((article, i) => <NewsCard key={i} {...article}/> )}
        </div>  
      </>
    )
  }
}

export default Browse