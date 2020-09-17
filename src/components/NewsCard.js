import React from 'react'

const NewsCard = ({ title, urlToImage }) => {

  return (
    <div className="news-card">
      <h3>{title}</h3>
      {urlToImage && <img src={urlToImage}/>}

    </div>
  )
}

export default NewsCard