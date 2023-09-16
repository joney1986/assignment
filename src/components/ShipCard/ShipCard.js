import React, { useEffect, useState } from "react";
import styles from "./ShipCard.module.scss";
import { fetchShipImage } from "../../services/api"; // Import the fetchShipImage function from api.js

function ShipCard({ ship, isMostFilms }) {
  const [image, setImage] = useState(null); // Initialize image state with null

  useEffect(() => {
    const getImg = async () => {
      try {
        const shipImage = await fetchShipImage(ship.model); // Call the fetchShipImage function with ship.model
        if (shipImage) {
          setImage(shipImage); // Set the image state with the fetched image data
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    getImg();
  }, [ship.model]); // Update image when ship.model changes

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardImage}>
          {image && (
            <img
              width="250"
              key={image.id}
              src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
              alt={image.title}
            />
          )}
        </div>
        <div>
          <div className={styles.category}>Ship Name :- {ship.name}</div>
          <div className={styles.heading}>
            Model: {ship.model}
            <div className={styles.author}>
              Number of Films: {ship.films.length}{" "}
             
              <div>Number of crew: {ship.crew}</div>
            </div>
          </div>
        </div>
        <div>
          {isMostFilms && (
            <img
              width="50"
              src="https://cdn4.iconfinder.com/data/icons/business-management-223/24/idea_innovation_management_change_company_business_corporate-1024.png"
              alt="Most Films Icon"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ShipCard;
