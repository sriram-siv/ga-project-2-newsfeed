import React from 'react'

import { getKeywords } from '../lib/feed'
import { getEverything } from '../lib/api'
import NewsCard from './NewsCard'

class Home extends React.Component {

  state = {
    keywords: []
  }

  async componentDidMount() {
    const keywords = getKeywords()

    if (!keywords) return

    const keywordsObj = await this.getArticles(keywords)
    this.setState({ keywords: keywordsObj })
    console.log(keywordsObj)

    // this.state.keywords.map(keyword => console.log(keyword))
  }

  async getArticles(keywords) {

    const keywordsObj = await keywords.map(keyword => {
      return {
        query: keyword,
        articles: getEverything({ query: keyword, pageSize: 5 })
      }
    })

    return keywordsObj


    // const params = {
    //   query: query,
    //   pageSize: 5
    // }

    // const response = await getEverything(params)
    // return response.data.articles
  }


  render() {
    return (
      <>
        <section className={`hero is-info is-bold ${!this.state.keywords[0] ? 'is-fullheight-with-navbar' : ''}`}>
          <div className="hero-body">
            <div className="container">
              <h1 className="title is-1 has-text-centered has-text-black">
                News Feed
                {/* <span role="img" aria-label="cheese emoji">🧀</span> */}
              </h1>
            </div>
          </div>
        </section>
        <div className="news-grid">
          {this.state.keywords[0] && this.state.keywords.map((article, i) => <NewsCard key={i} {...article} />)}
        </div>
      </>
    )
  }
}

export default Home