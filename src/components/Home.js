import React from 'react'

import { getKeywords, getCountries, removeSubscription } from '../lib/feed'
import { getStories, getTopStoriesInCountry } from '../lib/api'
import Header from './Header'
import SectionScroll from './SectionScroll'

class Home extends React.Component {

  state = {
    keywords: null,
    countries: null,
    loading: true,
    feedActive: false
  }

  async componentDidMount() {
    this.getSubs()
    this.setState({ feedActive: getKeywords() || getCountries() })
  }

  getSubs = async () => {

    const keywords = getKeywords()
    if (keywords) {
      const keywordsObj = await this.getArticles(keywords, 'q')
      this.setState({ keywords: keywordsObj })
    } else {
      this.setState({ keywords: null })
    }
    
    const countries = getCountries()
    if (countries) {
      const countriesObj = await this.getArticles(countries, 'country')
      this.setState({ countries: countriesObj, loading: false })
    } else {
      this.setState({ countries: null, loading: false })
    }
  }

  async getArticles(param, type) {
    const queryObj = []

    for (let i = 0; i < param.length; i++) {
      const response = type === 'q'
        ? await getStories({ q: param[i], country: '' })
        : await getTopStoriesInCountry(param[i])

      console.log(response)
      queryObj.push({ q: param[i], articles: response.data.articles })
    }

    return queryObj
  }

  removeSub = (type, query) => {
    removeSubscription(type, query)
    this.setState({ feedActive: getKeywords() || getCountries() })
  }


  render() {

    return (
      <>
        <Header feedActive={this.state.feedActive} loading={this.state.loading} />
        {this.state.keywords &&
          this.state.keywords.map((keyword, i) => <SectionScroll key={i} query={keyword} type="keyword" removeSub={this.removeSub} />)}
        {this.state.countries &&
          this.state.countries.map((country, i) => <SectionScroll key={i} query={country} type="country" removeSub={this.removeSub} />)}
      </>
    )
  }
}

export default Home