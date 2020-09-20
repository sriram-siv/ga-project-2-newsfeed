import React from 'react'
import image from '../images/feed.jpg'

const Filter = ({ params, suggestions, formActive, 
  handleChange, handleSubmit, handleAutocomplete,
  handleBlur, toggleForm, addToFeed }) => {
  
  const style = {
    position: 'absolute',
    top: '11em',
    left: '18px',
    width: 'calc(100% - 36px)',
    zIndex: '1',
    border: !suggestions ? '' : '1px solid lightblue',
    backgroundColor: '#eee',
    margin: '5px auto'
  }

  const formStyle = {
    height: formActive ? '500px' : '0px',
    backgroundColor: 'rgba(0,0,0,0)'
  }
  
  
  return (
    <div className='autocomplete-container'>
      <div className="form-container">
        <form onSubmit={handleSubmit}
          className="query-form"
          autoComplete="off"
          style={formStyle} >
          <div className="field">
            <label className="label">Keyword</label>
            <div className="control">
              <input
                className="input"
                placeholder="Keyword"
                name='q'
                value={params.q}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field autocomplete-container">
            <label className="label">Source</label>
            <div className="control">
              <input
                className="input"
                placeholder="Source"
                name="sourceName"
                value={params.sourceName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <div className="field">
            <button type="submit" className="button is-fullwidth">SEARCH NEWS</button>
          </div>
        </form>
        {/* ONLY DISPLAY THIS DIV WHEN FORM REDUCES TO 0 HEIGHT */}
        <div className="column is-full query-form">
          <button onClick={() => toggleForm(true)} 
            className="button is-fullwidth">
              BACK TO FILTERS
          </button>
          <div className="current-filters">
            <h2>Current filters</h2>
            <div className="buttons are-small button-box">
              {params.q &&
                <button className="button add-feed" onClick={() => addToFeed('q')}>{params.q}<span>&nbsp;<img src={image} /></span></button>
              }
              {params.source &&
                <button className="button add-feed" onClick={() => addToFeed('source')}>{params.sourceName}<span>&nbsp;<img src={image}/></span></button>
              }
            </div>
          </div>
        </div>
        

      </div>
      {suggestions &&
      <div style={style}>
        {suggestions.map((item, i) => {
          return <div className="autocomplete-item" key={i} onClick={handleAutocomplete}>{item}</div>
        })}
      </div>}
    </div>
  )
}

export default Filter