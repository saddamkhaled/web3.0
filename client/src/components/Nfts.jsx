import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function NFTMarket() {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const CollectionOptions = {
    method: 'GET',
    url: 'https://opensea13.p.rapidapi.com/collections',
    params: {
        
      offset: '0',
      limit: '300'
    },
    headers: {
      'X-RapidAPI-Key': 'cea7cb21f2msh0d907ebba33bef2p1c3547jsnc96b24d54ace',
      'X-RapidAPI-Host': 'opensea13.p.rapidapi.com'
    }
  };

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.request(CollectionOptions);
        setCollections(response.data.collections);
        setIsLoading(false);
        console.log(response.data.collections)
      } catch (error) {
        console.error(error);
      }
    };
    fetchCollections();
  }, []);

  if (isLoading) {
    return <div>Loading NFT Collections...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">NFT Market</h1>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">All Collections:</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {collections.map((collection) => (
            <li key={collection.slug} className="bg-white rounded-lg shadow-md p-4">
              <Link to={`/CollectionPage/${collection.slug}`}>
                <img
                  src={collection.image_url}
                  alt={collection.name}
                  className="w-full h-40 object-cover rounded-lg mb-2"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{collection.name}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NFTMarket;
