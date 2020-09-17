import React from 'react'
import { getEverything } from '../lib/api'

import NewsCard from './NewsCard'

class Browse extends React.Component {
  
  state = {
    params: {
      query: 'brexit'
    },

    articles: []
  }

  async componentDidMount() {
    const response = await getEverything(this.state.params)
    this.setState({ articles: response.data.articles })
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
  }

  render() {
    return (
      <>
        <div className="news-grid">
          {this.state.articles.map((article, i) => <NewsCard key={i} {...article}/> )}
        </div>

        <div className="columns">
          <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter box">
            <div className="field">
              <label className="label">Keyword in Title</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Title"
                  name='query'
                  value={this.state.params.query}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Source</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Source"
                  name="query"
                  value={this.state.params.query}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="field">
              <button onSubmit={this.handleSubmit} type="submit" className="button is-fullwidth is-info">Submit</button>
            </div>
          </form>
        </div>
      </>

    )
  }
}

export default Browse