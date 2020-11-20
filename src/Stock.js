import React, { Component } from "react";
import SearchBar from "./SearchBar";
import axios from "axios";
const API_KEY = "FVXS9TZV75C3KYR7";

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = { stocks: [], searchTerm: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Search Request
  /*
  FETCH
  search() {
      fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.state.searchTerm}&apikey=${API_KEY}`
      )
        .then((resp) => resp.json())
        .then((stocksData) =>
          this.setState({ stocks: stocksData["bestMatches"] }, () =>
            console.log(this.state.stocks)
          )
        );
    }
    */
  async search() {
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.state.searchTerm}&apikey=${API_KEY}`;
    try {
      const resp = await axios.get(url);
      let stocks = Array.from(
        resp.data["bestMatches"].map((stock) => [
          {
            symbol: stock["1. symbol"],
            name: stock["2. name"],
            type: stock["3. type"],
            region: stock["4. region"],
            marketOpen: stock["5. marketOpen"],
          },
        ])
      ).flat();
      this.setState((currState) => {
        return {
          ...currState,
          stocks,
        };
      });
    } catch (err) {
      console.error(err);
    }
  }
  // handleChange method
  handleChange(evt) {
    this.setState({ searchTerm: evt.target.value });
  }
  // submit handler
  handleSubmit(evt) {
    evt.preventDefault();
    this.search();
    this.setState({ searchTerm: "" });
  }

  render() {
    console.log(this.state.stocks);
    return (
      <div>
        <h1>Stocks</h1>
        <SearchBar
          searchTerm={this.state.searchTerm}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default Stock;
