import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Loader } from ".";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
const Input = ({ placeholder, step, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step={step}
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);
function NFTMarket() {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentAccount, connectWallet, handleChange, sendTransaction, cryptoFormData } = useContext(TransactionContext);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/nfts/list?order=market_cap_usd_asc"
    )
      .then((res) => {
        setCollections(res.data);
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  
  // const CollectionOptions = {
  //   method: 'GET',
  //   url: 'https://opensea13.p.rapidapi.com/collections',
  //   params: {
  //     offset: '0',
  //     limit: '100'
  //   },
  //   headers: {
  //     'X-RapidAPI-Key': 'cea7cb21f2msh0d907ebba33bef2p1c3547jsnc96b24d54ace',
  //     'X-RapidAPI-Host': 'opensea13.p.rapidapi.com'
  //   }
  // };

  // useEffect(() => {
  //   const fetchCollections = async () => {
  //     try {
  //       const response = await axios.request(CollectionOptions);
  //       setCollections(response.data.collections);
  //       setIsLoading(false);
  //       console.log(response.data.collections)
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchCollections();
  // }, []);

  const nftHandleSubmit = (e) => {
    // Handle NFT submission
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
        <p className="text-purple-600 text-lg ml-2">Loading NFT Collections...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
      <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
        <div className="flex justify-between flex-col w-full h-full">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
            </div>
          </div>
          <div>
            <p className="text-white font-light text-sm">
              {shortenAddress(currentAccount)}
            </p>
            <p className="text-white font-semibold text-lg mt-1">
              Ethereum
            </p>
          </div>
        </div>
      </div>
      <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
        <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
        <Input placeholder="Token ID" name="tokenId" step="1" type="number" handleChange={handleChange} />

        <div className="h-[1px] w-full bg-gray-400 my-2" />

        {isLoading ? (
          <Loader />
        ) : (
          <button
            type="button"
            onClick={nftHandleSubmit}
            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
          >
            Envoyer NFT
          </button>
        )}
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">NFT Market</h1>

        
          <div className="mt-8">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">All Collections:</h2>
  <table className="min-w-full border border-gray-300">
  <thead>
    <tr className="  bg-gray-100">
      <th className=" p-4 text-blue-500">Nom</th>
      <th className=" p-4 text-blue-500">Platforme Id</th>
      <th className=" p-4 text-blue-500">Contract Address</th>
      <th className=" p-4 text-blue-500">Actions</th>
    </tr>
  </thead>
  <tbody>
    {collections.map((collection) => (
      <tr key={collection.id}>
        <td className="p-4">{collection.name}</td>
        <td className="p-4">{collection.asset_platform_id}</td>
        <td className="p-4">{collection.contract_address}</td>
        <td className="p-4">
          <Link
            to={`/CollectionPage/${collection.id}`}
            key={collection.id}
            className="text-blue-500 hover:underline"
          >
            Voir Collection
          </Link>
        </td>
      </tr>
    ))}
  </tbody>
</table>

</div>

        </div>
      </div>
  
  );
}

export default NFTMarket;
