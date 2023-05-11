import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function CollectionPage() {
  const { collection_slug } = useParams();
  const [collectionAssets, setCollectionAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const CollectionAssetsOptions = {
    method: 'GET',
    url: 'https://opensea13.p.rapidapi.com/assets',
    params: {
      collection_slug: collection_slug,
      order_direction: 'desc',
      limit: '40',
      include_orders: 'false'
    },
    headers: {
      'X-RapidAPI-Key': 'cea7cb21f2msh0d907ebba33bef2p1c3547jsnc96b24d54ace',
      'X-RapidAPI-Host': 'opensea13.p.rapidapi.com'
    }
  };

  useEffect(() => {
    const fetchCollectionAssets = async () => {
      try {
        const response = await axios.request(CollectionAssetsOptions);
        setCollectionAssets(response.data.assets);
        setIsLoading(false);
        console.log(response.data.assets);

      } catch (error) {
        console.error(error);
      }
    };
    fetchCollectionAssets();
  }, [collection_slug]);

  if (isLoading) {
    return <div>Loading Collection Assets...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Collection: {collection_slug}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {collectionAssets.map((asset) => (
          <div
            key={asset.id}
            className="border border-gray-200 rounded-lg shadow-sm"
          >
            <div className="bg-white px-4 py-5 sm:p-6">
              <img
                src={asset.image_url}
                alt={asset.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <h2 className="text-xl font-semibold text-gray-900 mt-4">
                {asset.name}
              </h2>
              <p className="text-base text-gray-500 mt-2">
                {asset.asset_contract.description || "No description available."}
              </p>
              <p className="text-base font-medium text-gray-900 mt-4">
                {asset.last_sale
                  ? `${asset.last_sale.payment_token.symbol} ${asset.last_sale.payment_token.eth_price}`
                  : "Not for sale"}
              </p>
              <p className="text-base font-medium text-gray-900 mt-4">
                Contract Address : {asset.asset_contract.address || "No address available."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CollectionPage;
