// import React, { useState, useEffect } from 'react';
// import ShipCard from '../ShipCard/ShipCard';
// import { fetchStarships } from '../../services/api';
// import styles from './ShipList.module.scss';

// function ShipList() {
//     const [starships, setStarships] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const data = await fetchStarships();
//                 setStarships(data);
//                 setLoading(false); // Set loading to false when data is fetched successfully.
//             } catch (err) {
//                 setError(err); // Set error state if there's an error during fetching.
//                 setLoading(false); // Set loading to false in case of an error.
//             }
//         }
        
//         fetchData();
//     }, []);

//     return (
//         <div>
//             {loading ? (
//                 // Loading indicator goes here
//                  <div className={styles.loader}>Loading...</div>
//             ) : error ? (
//                 // Error message goes here
//                 <div className={styles.error}>Error: {error.message}</div>
//             ) : (
//                 // Render the list of starships
//                 starships.map((ship) => (
//                     <div className={styles.shipList}><ShipCard key={ship.name} ship={ship} /></div>
//                 ))
//             )}
//         </div>
//     );
// }

// export default ShipList;


// ShipList.js

import React, { useState, useEffect } from 'react';
import ShipCard from '../ShipCard/ShipCard';
import { fetchStarships } from '../../services/api';
import styles from './ShipList.module.scss';

function ShipList() {
    const [starships, setStarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shipWithMostFilms, setShipWithMostFilms] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchStarships();
                setStarships(data);

                // Find the ship with the most films
                const shipWithMostFilms = data.reduce((prevShip, currentShip) => {
                    return prevShip.films.length > currentShip.films.length ? prevShip : currentShip;
                }, data[0]);

                setShipWithMostFilms(shipWithMostFilms);

                setLoading(false); // Set loading to false when data is fetched successfully.
            } catch (err) {
                setError(err); // Set error state if there's an error during fetching.
                setLoading(false); // Set loading to false in case of an error.
            }
        }
        
        fetchData();
    }, []);

    return (
        <div>
            {loading ? (
                // Loading indicator goes here
                <div className={styles.loader}>Loading...</div>
            ) : error ? (
                // Error message goes here
                <div className={styles.error}>Error: {error.message}</div>
            ) : (
                // Render the list of starships
                starships.map((ship) => (
                    <div className={styles.shipList}>
                        <ShipCard key={ship.name} ship={ship} isMostFilms={ship === shipWithMostFilms} />
                    </div>
                ))
            )}
        </div>
    );
}

export default ShipList;


