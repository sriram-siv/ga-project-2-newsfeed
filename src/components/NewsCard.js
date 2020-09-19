import React from 'react'

class NewsCard extends React.Component {

  state = {
    hover: false
  }
  
  goToLink = () => {
    window.open(this.props.url, '_blank')
  }

  hoverAnimate = state => {
    this.setState({ hover: state })
  }

  render() {
    const { title, urlToImage, source, author } = this.props

    return (
      <div className={`${urlToImage ? 'news-card' : 'news-card-text-only'}`} onMouseEnter={() => this.hoverAnimate(true)} onMouseLeave={() => this.hoverAnimate(false)}>
        {urlToImage && <img src={urlToImage} alt="article" />}
        <h4>{title}</h4>
        <a onClick={this.goToLink}>
          {author && author.length < 20 && <p className='article-info'>Author: {author}</p>}
          <p className='article-info'>Source: {source.name}</p>
          <p className='read-more'>Read more</p>
          <div className={`shadow-1 ${this.state.hover ? 'card-hover' : ''}`}></div>
          <div className={`shadow-2 ${this.state.hover ? 'card-hover' : ''}`}></div>
        </a>
      </div>
    )
  }
}

export default NewsCard