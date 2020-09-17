import React from 'react'

const Filter = ({ params, suggestions, formActive, handleChange, handleSubmit, handleAutocomplete }) => {
  return (
    <div className={`columns form-container ${formActive ? '' : 'form-hide'}`}>
      <form onSubmit={handleSubmit} className="column is-full box" autoComplete="off">
        <div className="field">
          <label className="label">Keyword in Title</label>
          <div className="control">
            <input
              className="input"
              placeholder="Title"
              name='query'
              value={params.query}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Source</label>
          <div className="control">
            <input
              className="input"
              placeholder="Source"
              name="sourceName"
              value={params.sourceName}
              onChange={handleChange}
            />
          </div>
          {suggestions && <div className="autcomplete">
            {suggestions.map((item, i) => {
              return <div className="autocomplete-item" key={i} onClick={handleAutocomplete}>{item}</div>
            })}
          </div>}
        </div>

        <div className="field">
          <button onSubmit={handleSubmit} type="submit" className="button is-fullwidth is-info">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Filter