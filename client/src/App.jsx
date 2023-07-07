import {
  Navbar,
  Welcome,
  Footer,
  Services,
  Transactions,
  CryptoMarket,
  CoinHistory,
  NFTMarket,
  CollectionPage
} from "./components";
import React from "react";

import { Link, Routes, Route } from "react-router-dom";
const items = [
  { component: <Welcome />, key: "welcome" },
  { component: <Services />, key: "services" },
  { component: <Transactions />, key: "transactions" },
];
const renderedItems = items.map((item) => (
  <React.Fragment key={item.key}>{item.component}</React.Fragment>
));
const App = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
      <Routes>
        <Route path="/CryptoMarket" element={<CryptoMarket />} />
        <Route path="/CoinHistory/:coinId" element={<CoinHistory  />} />

        <Route path="/Nfts" element={<NFTMarket />} />
        <Route path="/CollectionPage/:id" element={<CollectionPage  />} />

        <Route path="/home" element={<Welcome />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/" element={renderedItems} />
      </Routes>
    </div>

    <Footer />
  </div>
);

export default App;
