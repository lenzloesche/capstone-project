export default async function apiGet(userName, setFetchingStatus) {
  // setFetchingStatus("Currently fetching");
  try {
    const response = await fetch(`/api/davoriteExercises/users/${userName}`);
    if (response.ok) {
      const dataFetch = await response.json();
      console.log("dataFetch", dataFetch);
      //  setFetchingStatus("Done fetching");
    } else {
      console.error("Response not OK.");
      //setFetchingStatus("Error");
    }
  } catch (error) {
    console.error("Error fetching: ", error);
    //setFetchingStatus("Error");
  }
}
