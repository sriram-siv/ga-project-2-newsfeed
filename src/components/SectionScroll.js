import React from 'react'

import NewsCard from './NewsCard'

const SectionScroll = ({ query }) => {
  return (
    <>
      <div className="keyword-heading">{query.query.toUpperCase()}</div>
      <div className="section-scroll">
        <div className='news-scroll'>
          {query.articles.map((article, i) => <NewsCard key={i} {...article} />)}
        </div>
      </div>
    </>
  )
}

export default SectionScroll