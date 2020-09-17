import React from 'react'

const NewsCard = ({ title, urlToImage, source, url, author }) => {

  console.log(urlToImage)

  if (!urlToImage) urlToImage = ''

  return (
    <div className="news-card">
      {urlToImage && <img src={urlToImage} alt="article" />}
      <h3>{title}</h3>
      {author && author.length < 20 && <p>Author: {author}</p>}
      <p>Source: { source.name }</p>
      <p><a href={url} target="_blank" rel="noreferrer">Read more</a></p>
      <div className="shadow-2"></div>
      <div className="shadow-1"></div>
    </div>
  )
}

export default NewsCard