import React from "react";
import "./StockItem.css";

const StockItem = ({ stock, handleClick }) => {
  return (
    <div onClick={() => handleClick(stock)} className="stock-item item">
      <div className="ui image">{stock["1. symbol"]}</div>{" "}
      <div className="content">
        <div className="header">{stock["2. name"]}</div>
      </div>
    </div>
  );
};

export default StockItem;
