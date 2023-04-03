const url = "https://api.api-ninjas.com/v1/nutrition?query=";
const apiKey = process.env.NEXT_PUBLIC_EXERCISES_APIKEY;

export default async function fetchDiet(
  input,
  setFetchingStatus,
  setSearchResults
) {
  setFetchingStatus("Fetching Data");
  try {
    const response = await fetch(url + input, {
      headers: {
        "x-api-key": apiKey,
      },
    });
    if (response.ok) {
      const dataFetch = await response.json();
      setSearchResults(dataFetch);
      setFetchingStatus("Fetching Done");
    } else {
      setFetchingStatus("Error");
      console.error("Response not OK.");
    }
  } catch (error) {
    setFetchingStatus("Error");
    console.error("Error fetching: ", error);
  }
}
