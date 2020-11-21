import React, { Component } from "react";
import StockItem from "./StockItem";

function StocksList(props) {
  console.log("prop", props);
  const renderedList = props.stocks.map((stock) => {
    return <StockItem key={stock["1. symbol"]} stock={stock} />;
  });

  return <div className="ui relaxed divided list">{renderedList}</div>;
}

export default StocksList;
