import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "chart.js/auto";
import "../styles/CoinHistory.css";
import { useParams } from "react-router-dom";

const CoinHistory = () => {
  const { coinId } = useParams();

  const [coinData, setCoinData] = useState([]);
  const [chart, setChart] = useState(null);
  const [days, setDays] = useState(365);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=eur&days=${days}`
      );
      setCoinData(result.data.prices);
    };
    fetchData();
  }, [coinId, days]);

  useEffect(() => {
    if (chart) {
      chart.destroy();
    }
    const chartData = {
      labels: coinData.map((data) =>
        new Date(data[0]).toLocaleDateString("en-US")
      ),
      datasets: [
        {
          label: `${coinId} Prix (EUR)`,
          data: coinData.map((data) => data[1]),
          fill: true,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.9,
        },
      ],
    };
    const chartOptions = {
      scales: {
        xAxes: [
          {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
            },
          },
        ],
      },
    };
    const newChart = new Chart("myChart", {
      type: "line",
      data: chartData,
      
      
      
    });
    setChart(newChart);
  }, [coinData, coinId]);

  const handleDayClick = (numDays) => {
    setDays(numDays);
  };

  return (
    <div className="chart-container">
      <div className="btn-group flex space-x-1">
        <button className="bg-indigo-500 text-white   px-2 rounded-tl-lg " onClick={() => handleDayClick(1)}>
           1J 
        </button>
        <button className="bg-indigo-500 text-white px-2 " onClick={() => handleDayClick(7)}>
          7J
        </button>
        <button className="bg-indigo-500 text-white  px-2" onClick={() => handleDayClick(30)}>
          1M
        </button>
        <button className="bg-indigo-500 text-white  px-2 rounded-tr-lg" onClick={() => handleDayClick(365)}>
          1ans
        </button>
      </div>
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default CoinHistory;
