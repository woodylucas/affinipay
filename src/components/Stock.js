import React, { Component } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import StocksList from "./StocksList";
import debounce from "lodash.debounce";

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = { stocks: [], searchTerm: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async search() {
    const API_KEY = "FVXS9TZV75C3KYR7";
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.state.searchTerm}&apikey=${API_KEY}`;
    try {
      const resp = await axios.get(url);
      console.log(resp);
      console.log(resp.data["bestMatches"]);
      this.setState({ stocks: resp.data["bestMatches"] });
    } catch (err) {
      console.error(err);
    }
  }
  // handleChange method
  handleChange = debounce((searchTerm) => {
    this.setState({ searchTerm });
    this.search();
  }, 100);

  handleClick(evt) {
    console.log("Input was clicked");
  }

  render() {
    console.log(this.state.stocks);
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <h1>Stock Search</h1>
        <SearchBar
          handleSubmit={this.handleSubmit}
          searchTerm={this.state.searchTerm}
          handleChange={(evt) => this.handleChange(evt.target.value)}
        />
        <StocksList handleClick={this.handleClick} stocks={this.state.stocks} />
      </div>
    );
  }
}

export default Stock;
