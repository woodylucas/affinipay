import React, { Component } from "react";

function StockDetail({ stock }) {
  if (!stock) {
    return <div>Loading...</div>;
  }
  return (
    <div className="ui segment ">
      <h4 className="ui header">{stock["1. symbol"]}</h4>
      <p>Company: {stock["2. name"]}</p>
      <p>Type: {stock["3. type"]}</p>
      <p>Region: {stock["4. region"]}</p>
    </div>
  );
}

export default StockDetail;