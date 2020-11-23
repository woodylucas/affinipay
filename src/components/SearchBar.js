import axios from "axios";
import { set } from "lodash";
import React, { useState, useEffect } from "react";
import StockDetail from "./StockDetail";
import StocksList from "./StocksList";
const API_KEY = "FVXS9TZV75C3KYR7";

const SearchBar = () => {
  // useState methods
  const [selectedStock, setSelectedStock] = useState(null);
  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);
    // clean up
    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    const search = async () => {
      setError(false);
      try {
        const { data } = await axios.get("https://www.alphavantage.co/query", {
          params: {
            function: "SYMBOL_SEARCH",
            keywords: debouncedTerm,
            datatype: "json",
            apikey: API_KEY,
          },
        });
        setStocks(data["bestMatches"]);
      } catch (error) {
        setError(true);
      }
    };
    if (debouncedTerm) {
      search();
    }
  }, [debouncedTerm]);

  const handleChange = (evt) => {
    setTerm(evt.target.value);
  };

  const handleClick = (stock) => {
    setSelectedStock(stock);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  const detailClick = (stocks) => {
    setSelectedStock(stocks);
  };

  return (
    <div className="ui container" style={{ marginTop: "10px" }}>
      <h1>Stock Search</h1>
      <div className="search-bar ui segment">
        <form className="ui form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Stock Search</label>
            <input
              type="text"
              placeholder="Company"
              value={term}
              onChange={handleChange}
            />
            <button onClick={() => detailClick(stocks[0])}>Submit</button>
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
