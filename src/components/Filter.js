import React from 'react'

const Filter = ({ params, handleChange, handleSubmit }) => {
  return (
    <div className="columns">
      <form onSubmit={handleSubmit} className="column is-half is-offset-one-quarter box">
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
              name="source"
              value={params.source}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field">
          <button onSubmit={handleSubmit} type="submit" className="button is-fullwidth is-info">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Filter