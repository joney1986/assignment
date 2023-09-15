// import React from 'react';
// import styles from './ShipCard.module.scss';

// function ShipCard({ ship }) {
//     return (
//         <>
//         <div className={styles.card}>
//             <h2>{ship.name}</h2>
//             <p>Model: {ship.model}</p>
//             <p>Number of Films: {ship.films.length}</p>
//             <p>Number of crew: {ship.crew}</p>
//         </div>
//         </>
//     );
// }

// export default ShipCard;


// ShipCard.js

import React from 'react';
import styles from './ShipCard.module.scss';
// import mostFilmsIcon from '../../assets/most-films-icon.png'; 

function ShipCard({ ship, isMostFilms }) {
    return (
        <>
        <div className={styles.card}>
            <h2>{ship.name}</h2>
            <p>Model: {ship.model}</p>
            <p>Number of Films: {ship.films.length}</p>
            <p>Number of crew: {ship.crew}</p>
            {isMostFilms && <img width="50" src="https://cdn4.iconfinder.com/data/icons/business-management-223/24/idea_innovation_management_change_company_business_corporate-1024.png" alt="Most Films Icon" />}
        </div>
        </>
    );
}

export default ShipCard;



