import React from 'react'

const NewsCard = ({ title, urlToImage, source, url, author }) => {

  if (!urlToImage) urlToImage = ''

  function goToLink() {
    window.open(url, '_blank')
  }

  return (
    <div className={`${urlToImage ? 'news-card' : 'news-card-text-only'}`}>
      {urlToImage && <img src={urlToImage} alt="article" />}
      <h4>{title}</h4>
      <a onClick={goToLink}>
        {author && author.length < 20 && <p className='article-info'>Author: {author}</p>}
        <p className='article-info'>Source: { source.name }</p>
        <p className='read-more'><a href={url} target="_blank" rel="noreferrer">Read more</a></p>
        <div className="shadow-2"></div>
        <div className="shadow-1"></div>
      </a>
    </div>
  )
}

export default NewsCard