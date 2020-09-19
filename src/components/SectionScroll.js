import React from 'react'

import NewsCard from './NewsCard'

const SectionScroll = ({ query, type, removeSub }) => {


  return (
    <>
      <div className="keyword-heading">{query.q.toUpperCase()}<span onClick={() => removeSub(type, query.q)}>remove</span></div>
      <div className="section-scroll">
        <div className='news-scroll'>
          {query.articles.map((article, i) => <NewsCard key={i} {...article} />)}
        </div>
      </div>
    </>
  )
}

export default SectionScroll