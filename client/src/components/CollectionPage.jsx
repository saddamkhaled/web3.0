import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { shortenAddress } from "../utils/shortenAddress";

function CollectionPage() {
  const { id } = useParams();
  const [collectionData, setCollectionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/nfts/${id}`);
        setCollectionData([response.data]); // Wrap response data in an array
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return <div>Loading Collection Assets...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Collection: {id}</h1>

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {collectionData.map((collection) => (
          <li key={collection.id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={collection.image.small}
              alt={collection.asset_platform_id}
              className="w-full h-40 object-cover rounded-lg mb-2"
            />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{collection.name}</h3>
            <p className="text text-black "> {collection.description}</p>
            <p className="text text-black font-semibold  "> Contract Address : {shortenAddress(collection.contract_address)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CollectionPage;
