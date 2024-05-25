import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

export default function StockApp() {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    axios.get("/data/stock.json").then((resp) => {
      setStockData(resp.data);
    });
  }, []);

  return (
    <div>
      <h1>Stocks</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>날짜</th>
            <th>종가</th>
            <th>시가</th>
            <th>고가</th>
            <th>저가</th>
            <th>거래대금</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((elem) => (
            <tr>
              <td>{elem.date}</td>
              <td>{elem.tradePrice}</td>
              <td>{elem.openingPrice}</td>
              <td>{elem.highPrice}</td>
              <td>{elem.lowPrice}</td>
              <td>{elem.candleAccTradePrice}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
