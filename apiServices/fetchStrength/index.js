const url = "https://api.api-ninjas.com/v1/exercises";
const apiKey = process.env.NEXT_PUBLIC_EXERCISES_APIKEY;
//const apiKey = NEXT_PUBLIC_EXERCISES_APIKEY;

export default async function fetchStrength(
  input,
  setFetchingStatus,
  SetData,
  resetDetails
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
      SetData(dataFetch);
      setFetchingStatus("Fetching Done");
      resetDetails();
    } else {
      setFetchingStatus("Error");
      console.error("Response not OK.");
    }
  } catch (error) {
    setFetchingStatus("Error");
    console.error("Error fetching: ", error);
  }
}
