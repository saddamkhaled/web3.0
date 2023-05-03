import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Coin from './Coin';
import '../styles/CryptoMarket.css';

function CryptoMarket() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=fr'
      )
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        {/* <h1 className='coin-text'>Rechercher une devise</h1> */}
        <form>
          <input
            className='coin-input rounded-full text-center'
            type='text'
            onChange={handleChange}
            placeholder='Rechercher '
          />
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Link to={`/CoinHistory/${coin.id}`} key={coin.id}>
            <Coin
            //id={coin.id}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol}
              marketcap={coin.total_volume}
              volume={coin.market_cap}
              image={coin.image}
              priceChange={coin.price_change_percentage_24h}
            />
          </Link>
        );
      })}
    </div>
  );
};


export default CryptoMarket;
