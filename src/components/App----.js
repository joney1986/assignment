import React, { useState, useEffect } from 'react';

const App = () => {
  const [starshipData, setStarshipData] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    // Function to fetch starship data from SWAPI
    const fetchStarshipData = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/starships/1/');
        if (response.ok) {
          const data = await response.json();
          setStarshipData(data);
        } else {
          console.error('Error fetching starship data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching starship data:', error);
      }
    };

    fetchStarshipData();
  }, []);

  useEffect(() => {
    // Function to generate image URL based on starship name
    const generateImageURL = () => {
      if (starshipData) {
        // Create the Wikipedia URL for the starship name
        const starshipName = starshipData.name.replace(/ /g, '_');
        const wikipediaURL = `https://en.wikipedia.org/wiki/${starshipName}`;

        // Check if a Wikipedia page exists for the starship
        fetch(wikipediaURL)
          .then((response) => {
            if (response.status === 200) {
              // Wikipedia page exists, generate an image URL
              const imageUrl = `https://en.wikipedia.org/wiki/File:${starshipName}.jpg`;
              setImageURL(imageUrl);
            } else {
              console.log('No Wikipedia page found for the starship.');
            }
          })
          .catch((error) => {
            console.error('Error checking Wikipedia:', error);
          });
      }
    };

    generateImageURL();
  }, [starshipData]);

  return (
    <div>
      {starshipData && (
        <div>
          <h2>Starship Name: {starshipData.name}</h2>
          {imageURL ? (
            <img src={imageURL} alt={`Image of ${starshipData.name}`} />
          ) : (
            <p>No image found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
