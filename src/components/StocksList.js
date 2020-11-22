import React, { Component } from "react";
import StockItem from "./StockItem";

const StocksList = ({ stocks, handleClick }) => {
  const renderedList = stocks.map((stock) => {
    return (
      <StockItem
        key={stock["1. symbol"]}
        stock={stock}
        handleClick={handleClick}
      />
    );
  });

  return <div className="ui relaxed divided list">{renderedList}</div>;
};

export default StocksList;
