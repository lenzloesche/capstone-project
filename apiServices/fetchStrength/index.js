const apiKey = "/N+lgsT1Ci9aZ5EnpUlNFA==jE3hMgeWrU1Jd0q0";
const url = "https://api.api-ninjas.com/v1/exercises";

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
