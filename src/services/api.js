const SWAPI_BASE_URL = "https://swapi.dev/api";

async function fetchStarships() {
  try {
    const response = await fetch(`${SWAPI_BASE_URL}/starships`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // Sort and filter the data as required
    const sortedAndFilteredStarships = data.results
      .filter((starship) => parseInt(starship.crew) <= 10)
      .sort((a, b) => parseInt(a.crew) - parseInt(b.crew));
    console.log(sortedAndFilteredStarships);
    return sortedAndFilteredStarships;
  } catch (error) {
    console.error("Error fetching or processing starships:", error);
    throw error;
  }
}

async function fetchShipImage(shipName) {
  const apiKey = "a96c42f292f39f57f52996a71dc7c784"; // Replace with your Flickr API key
  try {
    const response = await fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${shipName}&format=json&nojsoncallback=1`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (data.stat === "ok") {
      return data.photos.photo[0];
    } else {
      console.error("Flickr API error:", data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export { fetchStarships, fetchShipImage };
