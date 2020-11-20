import React, { Component } from "react";

class SearchBar extends Component {
  render() {
    const { handleChange, searchTerm, handleSubmit } = this.props;
    return (
      <div className="SearchBar">
        <form onSubmit={handleSubmit}>
          <label>Enter Ticker Symbol:</label>
          <input
            type="text"
            placeholder="Company"
            value={searchTerm}
            onChange={handleChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
