import React, { Component } from "react";

class SearchBar extends Component {
  render() {
    const { handleChange, searchTerm } = this.props;
    return (
      <div className="SearchBar">
        <form>
          <input
            type="text"
            placeholder="Company"
            value={searchTerm}
            onChange={handleChange}
          />
          <button>Search</button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
