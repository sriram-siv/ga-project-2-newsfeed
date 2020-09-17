import React from 'react'

const NewsCard = ({ title, description, urlToImage }) => {

  console.log(urlToImage)

  if (!urlToImage) urlToImage = ''

  return (
    <div className="news-card">
      {urlToImage && <img src={urlToImage} alt="article" />}
      <h3>{title}</h3>
      <p>{ description }</p>
      <div className="shadow-2"></div>
      <div className="shadow-1"></div>
    </div>
  )
}

export default NewsCard