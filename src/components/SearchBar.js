import axios from "axios";
import React, { useState, useEffect } from "react";
import StockDetail from "./StockDetail";
import StocksList from "./StocksList";
const API_KEY = "FVXS9TZV75C3KYR7";

const SearchBar = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [term, setTerm] = useState("tesla");
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 2000);
    // clean up
    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("https://www.alphavantage.co/query", {
        params: {
          function: "SYMBOL_SEARCH",
          keywords: debouncedTerm,
          datatype: "json",
          apikey: API_KEY,
        },
      });
      setStocks(data["bestMatches"]);
    };
    search();
  }, [debouncedTerm]);

  const handleChange = (evt) => {
    setTerm(evt.target.value);
  };

  const handleClick = (stock) => {
    console.log("INPUT was clicked", stock);
    setSelectedStock(stock);
  };

  return (
    <div className="ui container" style={{ marginTop: "10px" }}>
      <h1>Stock Search</h1>
      <div className="search-bar ui segment">
        <form className="ui form">
          <div className="field">
            <label>Stock Search</label>
            <input
              type="text"
              placeholder="Company"
              value={term}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
      <div className="ui grid">
        <div className="ui row">
          <div className="eleven wide column">
            <StockDetail stock={selectedStock} />
          </div>
          <div>
            <StocksList handleClick={handleClick} stocks={stocks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
