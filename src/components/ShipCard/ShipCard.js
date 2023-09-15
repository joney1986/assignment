import React,{useEffect, useState} from 'react';
import styles from './ShipCard.module.scss';


function ShipCard({ ship, isMostFilms }) {
    const [shipName, setShipName] = useState(ship.model);
    const [image, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const apiKey = 'a96c42f292f39f57f52996a71dc7c784'; // Replace with your Flickr API key
    useEffect(() => {
        const getImg = async () => {
            setLoading(true);
          
            try {
              const response = await fetch(
                `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${shipName}&format=json&nojsoncallback=1`
              );
          
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
          
              const data = await response.json();
          
              if (data.stat === 'ok') {
                setImages(data.photos.photo[0]);
              } else {
                console.error('Flickr API error:', data.message);
              }
            } catch (error) {
              console.error('Error fetching data:', error);
            } finally {
              setLoading(false);
            }
          };

          getImg();
    },[]);
    return (
        <>
        <div className={styles.card}>
            <div className={styles.cardImage}> <img
            width="250"
            key={image.id}
            src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
            alt={image.title}
        /></div>
         <div>
            <div className={styles.category}>Ship Name :- {ship.name} </div>
            <div className={styles.heading}> Model: {ship.model}
                <div className={styles.author}> Number of Films: {ship.films.length} <span className={styles.name}>Number of crew: {ship.crew}</span> </div>
            </div>   
            </div>
            <div>{isMostFilms && <img width="50" src="https://cdn4.iconfinder.com/data/icons/business-management-223/24/idea_innovation_management_change_company_business_corporate-1024.png" alt="Most Films Icon" />}</div>
        </div>
        {/* <div className={styles.card}>
        <img
            key={image.id}
            src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
            alt={image.title}
        />
            <h2>{ship.name}</h2>
            <p>Model: {ship.model}</p>
            <p>Number of Films: {ship.films.length}</p>
            <p>Number of crew: {ship.crew}</p>
            {isMostFilms && <img width="50" src="https://cdn4.iconfinder.com/data/icons/business-management-223/24/idea_innovation_management_change_company_business_corporate-1024.png" alt="Most Films Icon" />}
        </div> */}
        </>
    );
}

export default ShipCard;



