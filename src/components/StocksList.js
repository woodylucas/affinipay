import React from "react";
import StockItem from "./StockItem";

const StocksList = ({ stocks, handleClick, selectedStock }) => {
  const renderedList = stocks.map((stock) => {
    if (stock === selectedStock) return null;
    return (
      <StockItem
        key={stock["1. symbol"]}
        stock={stock}
        handleClick={handleClick}
      />
    );
  });

  return <div className="ui middle aligned animated list">{renderedList}</div>;
};

export default StocksList;
