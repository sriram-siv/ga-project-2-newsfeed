import React from 'react'

import { getKeywords, getSources } from '../lib/feed'
import { getEverything } from '../lib/api'
import Header from './Header'
import SectionScroll from './SectionScroll'

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

      const response = await getEverything({ query: query, source: source, pageSize: 20 })
      console.log(response)
      queryObj.push({ query: param[i], articles: response.data.articles })
    }

    return queryObj
  }


  render() {
    return (
      <>
        <Header feedActive={getKeywords() || getSources()} loading={this.state.loading} />
        {this.state.sources[0] &&
          this.state.sources.map((source, i) => <SectionScroll key={i} query={source} />)}
        {this.state.keywords[0] &&
          this.state.keywords.map((keyword, i) => <SectionScroll key={i} query={keyword} />)}
      </>
    )
  }
}

export default Home