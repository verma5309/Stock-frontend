import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/stocks');
        setStocks((prevStocks) => {
          return response.data.map((newStock) => {
            const existingStock = prevStocks.find((stock) => stock.symbol === newStock.symbol);
            return existingStock ? { ...existingStock, price: newStock.price } : newStock;
          });
        });
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };
    

    fetchData();

    const interval = setInterval(fetchData, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleStockChange = (e) => {
    const selectedSymbol = e.target.value;
    setSelectedStock(selectedSymbol);
  };
  useEffect(() => {
    const selectedStocks = stocks.find((stock) => stock.symbol === selectedStock);
    if (selectedStocks) {
      setCurrentPrice(selectedStocks.price);
    }
  },[stocks])

  return (
    <div className="App">
      <h1>Stock Price Tracker</h1>
      <label>Select Stock:</label>
      <select value={selectedStock} onChange={handleStockChange}>
        {stocks.map((stock) => (
          <option key={stock.symbol} value={stock.symbol}>
            {stock.symbol}
          </option>
        ))}
      </select>
      <div>
        <strong>Current Price:</strong> {currentPrice}
      </div>
    </div>
  );
}

export default App;
