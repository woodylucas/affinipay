import axios from "axios";
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
  const [loading, setLoading] = useState(false);

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
      // set loading before API operation starts
      setLoading(true);
      try {
        const { data } = await axios.get("https://www.alphavantage.co/query", {
          params: {
            function: "SYMBOL_SEARCH",
            keywords: debouncedTerm,
            datatype: "json",
            apikey: API_KEY,
          },
        });
        if (!data["bestMatches"]) {
          setError(true);
          return;
        }
        setStocks(data["bestMatches"]);
      } catch (error) {
        setError(true);
        console.log(error.message);
      }
      // After operation ends
      setLoading(false);
    };
    if (debouncedTerm) {
      search();
    }
  }, [debouncedTerm]);

  // handlers
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

  // refresh the page
  const refreshPage = () => {
    setTimeout(() => {
      window.location.reload(true);
    }, 2000);
  };

  const renderError = () => {
    if (!error) {
      return (
        loading && (
          <div style={{ color: `green` }}>
            fetching for stocks "<strong>{debouncedTerm}</strong>"
          </div>
        )
      );
    } else {
      return (
        error && (
          <div style={{ color: `red` }}>
            {" "}
            Something went wrong... Page will reload
            {refreshPage()}
          </div>
        )
      );
    }
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
        {renderError()}
      </div>
      <div className="ui grid">
        <div className="ui row">
          <div className="eleven wide column">
            <StockDetail stock={selectedStock} />
          </div>
          <div>
            <StocksList
              selectedStock={selectedStock}
              handleClick={handleClick}
              stocks={stocks}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
