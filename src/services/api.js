const SWAPI_BASE_URL = 'https://swapi.dev/api';

async function fetchStarships() {
    try {
        const response = await fetch(`${SWAPI_BASE_URL}/starships`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Sort and filter the data as required
        const sortedAndFilteredStarships = data.results
            .filter((starship) => parseInt(starship.crew) <= 10)
            .sort((a, b) => parseInt(a.crew) - parseInt(b.crew));
        console.log(sortedAndFilteredStarships);
        return sortedAndFilteredStarships;
    } catch (error) {
        console.error('Error fetching or processing starships:', error);
        throw error;
    }
}

export { fetchStarships };








