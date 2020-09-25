import React from 'react'

const SubNav = ({ categories, selected, handleClick }) => {

  return (
    <div className="sub-nav">
      {categories.map((category, i) => (
        <div key={i} onClick={handleClick}
          className={`nav-item sub ${selected === category ? 'is-selected' : ''}`}>
          {category}
        </div>
      ))}
    </div>
  )  
}

export default SubNav

