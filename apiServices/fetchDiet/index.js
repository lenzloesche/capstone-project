const url = "/api/ninjas/";

export default async function fetchDiet(input, setFetchingStatus) {
  setFetchingStatus("Fetching Data");
  try {
    const response = await fetch(url + input);
    if (response.ok) {
      const dataFetch = await response.json();
      setFetchingStatus("Fetching Done");
      return dataFetch;
    } else {
      setFetchingStatus("Error");
      console.error("Response not OK.");
      return "Error";
    }
  } catch (error) {
    setFetchingStatus("Error");
    console.error("Error fetching: ", error);
    return "Error";
  }
}
