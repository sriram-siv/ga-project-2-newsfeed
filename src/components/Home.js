import React from 'react'

import { getKeywords, getSources } from '../lib/feed'
import { getEverything } from '../lib/api'
import NewsCard from './NewsCard'

class Home extends React.Component {

  state = {
    keywords: [],
    sources: [],
    loading: true
  }

  async componentDidMount() {
    const keywords = getKeywords()
    if (keywords) {
      const keywordsObj = await this.getArticles(keywords, 'query')
      this.setState({ keywords: keywordsObj })
    }
    const sources = getSources()
    if (sources) {
      const sourcesObj = await this.getArticles(sources, 'source')
      this.setState({ sources: sourcesObj, loading: false })
    }
  }

  async getArticles(param, type) {

    const queryObj = []

    
    
    for (let i = 0; i < param.length; i++) {
      const query = type === 'query' ? param[i] : ''
      const source = type === 'source' ? param[i] : ''

      const response = await getEverything({ query: query, source: source, pageSize: 5 })
      console.log(response)
      queryObj.push({ query: param[i], articles: response.data.articles })
    }

    return queryObj
  }


  render() {
    const keywordsStored = getKeywords()
    return (
      <>
        <section className='hero is-info is-bold' id={`${this.state.loading ? '' : 'hero-loading'}`}>
          <div className="hero-body header">
            <div className="container">
              <h1 className="title is-1 has-text-centered">
                News Feed
              </h1>
              <p className="intro-blurb">Browse, create, curate<br /> Your own personalised news feed</p>
            </div>
            {!keywordsStored && <div className="feed-empty">
              <h3>Your feed is empty right now <br/>Browse to add</h3>
            </div>}
            { keywordsStored && <div className="loading" id={`${this.state.loading ? 'is-loading' : ''}`}>LOADING</div>}
          </div>
        </section>
        {this.state.keywords[0] && this.state.keywords.map((keyword, i) => {
          return (
            <div className="news-grid" key={i}>
              <h3 className="keyword-heading">{keyword.query.toUpperCase()}</h3>
              {keyword.articles.map((article, i) => <NewsCard key={i} {...article} />)}
            </div>
          )
        })}
        {this.state.sources[0] && this.state.sources.map((source, i) => {
          return (
            <div className="news-grid" key={i}>
              <h3 className="keyword-heading">{source.query.toUpperCase()}</h3>
              {source.articles.map((article, i) => <NewsCard key={i} {...article} />)}
            </div>
          )
        })}
      </>
    )
  }
}

export default Home