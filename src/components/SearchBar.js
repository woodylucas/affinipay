import React, { Component } from "react";

class SearchBar extends Component {
  render() {
    const { handleChange, searchTerm } = this.props;
    return (
      <div className="search-bar ui segment">
        <form className="ui form">
          <div className="field">
            <label>Stock Search</label>
            <input
              type="text"
              placeholder="Company"
              value={searchTerm}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
