import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/CoinList.css";
function CoinList() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
          sparkline: false,
        },
      })
      .then((res) => {
        setCoins(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className=" flex flex-wrap">
    {coins.map((coin) => {
      return (
        <Link to={`/CoinHistory/${coin.id}`} key={coin.id}>
            
          <div className="coinlist-card basis-1/4">
            <h3 >{coin.name}</h3>
            <img src={coin.image} alt={coin.name} />
            <p>{coin.symbol.toUpperCase()}</p>
            <p>{`$${coin.current_price.toFixed(2)}`}</p>
          
          </div>
        </Link>
      );
    })}
  </div>
  );
}

export default CoinList;
