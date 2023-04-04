const url = "/api/ninjas/";

export default async function fetchDiet(
  input,
  setFetchingStatus,
  setSearchResults
) {
  setFetchingStatus("Fetching Data");
  try {
    const response = await fetch(url + input);
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
