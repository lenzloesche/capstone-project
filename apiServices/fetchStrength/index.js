const url = "/api/ninjasExercise/exercises";

export default async function fetchStrength(
  input,
  setFetchingStatus,
  SetData,
  resetDetails
) {
  setFetchingStatus("Fetching Data");
  try {
    const response = await fetch(url, {
      headers: {
        searchterm: input,
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
