import React from 'react'

import { getKeywords } from '../lib/feed'
import { getEverything } from '../lib/api'
import NewsCard from './NewsCard'

class Home extends React.Component {

  state = {
    keywords: [],
    loading: true
  }

  async componentDidMount() {
    const keywords = getKeywords()
    if (!keywords) return
    const keywordsObj = await this.getArticles(keywords)
    this.setState({ keywords: keywordsObj, loading: false })
  }

  async getArticles(keywords) {

    const keywordsObj = []
    
    for (let i = 0; i < keywords.length; i++) {
      const response = await getEverything({ query: keywords[i], pageSize: 5 })
      keywordsObj.push({ query: keywords[i], articles: response.data.articles })
    }

    return keywordsObj
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
      </>
    )
  }
}

export default Home