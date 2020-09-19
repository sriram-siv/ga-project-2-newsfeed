import React from 'react'

const SubNavBtns = (props) => {

  const btnCategories = ['General', 'Business', 'Technology', 'Entertainment', 'Health', 'Sport']

  return (
    btnCategories.map((category, i) => {
      return <button key={i} onClick={props.onClick} className="button is-large">
        {category}
      </button>
    })
  )  
}

export default SubNavBtns

