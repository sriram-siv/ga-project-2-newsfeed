import React from 'react'

const Filter = ({ params, suggestions, formActive, handleChange, handleSubmit, handleAutocomplete, handleBlur }) => {
  
  const style = {
    position: 'absolute',
    width: '100%',
    zIndex: '1',
    border: '1px solid lightblue',
    backgroundColor: '#eee',
    marginTop: '5px'
  }
  
  
  return (
    <div className={`columns form-container ${formActive ? '' : 'form-hide'}`}>
      <form onSubmit={handleSubmit}
        className="column is-full box"
        autoComplete="off">
        <div className="field">
          <label className="label">Keyword</label>
          <div className="control">
            <input
              className="input"
              placeholder="Keyword"
              name='query'
              value={params.query}
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
          {suggestions &&
            <div className="autcomplete" style={style}>
              {suggestions.map((item, i) => {
                return <div className="autocomplete-item" key={i} onClick={handleAutocomplete}>{item}</div>
              })}
            </div>}
        </div>

        <div className="field">
          <button onSubmit={handleSubmit}
            type="submit" 
            className="button is-fullwidth submit-btn">SEARCH NEWS</button>
        </div>
      </form>
    </div>
  )
}

export default Filter