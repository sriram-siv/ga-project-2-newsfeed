import React from 'react'

const SubNavBtns = (props) => {

  const btnCategories = ['General', 'Business', 'Technology', 'Entertainment', 'Health', 'Sport']

  return (
    btnCategories.map((category, i) => {
      return <button key={i} onClick={props.onClick}
        className={`button is-large ${props.isSubSelected === category ? 'is-subselected' : ''}`}
      >
        {category}
      </button>
    })
  )  
}

export default SubNavBtns

