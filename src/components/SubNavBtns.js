import React from 'react'

const SubNavBtns = (props) => {

  const btnCategories = ['General', 'Business', 'Technology', 'Entertainment', 'Health', 'Sport']

  return (
    btnCategories.map((category, i) => {
      return (
        <div key={i} onClick={props.onClick}
          className={`nav-item sub ${props.isSubSelected === category.toUpperCase() ? 'is-selected' : ''}`}>
          {category.toUpperCase()}
        </div>
      )
    })
  )  
}

export default SubNavBtns

