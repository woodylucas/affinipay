import React, { Component } from "react";
import SearchBar from "./SearchBar";
import axios from "axios";
const API_KEY = "FVXS9TZV75C3KYR7";

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = { stocks: [], searchTerm: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  // Request
  async componentDidMount() {
    let stockSymbol = "AMZN";
    try {
      let resp = await axios.get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockSymbol}&apikey=${API_KEY}`
      );
      let stocks = Array.from(resp.data["bestMatches"]).map((stock) => [
        {
          symbol: stock["1. symbol"],
          name: stock["2. name"],
          type: stock["3. type"],
          region: stock["4. region"],
          marketOpen: stock["5. marketOpen"],
        },
      ]);
      this.setState((currState) => {
        return {
          ...currState,
          stocks,
        };
      });
    } catch (error) {
      console.error(error);
    }
  }

  // handleChange method
  handleChange(evt) {
    this.setState({ searchTerm: evt.target.value });
  }

  render() {
    console.log(this.state.stocks);
    return (
      <div>
        <h1>Stocks</h1>
        <SearchBar
          searchTerm={this.state.searchTerm}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Stock;
