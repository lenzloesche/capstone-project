export default async function apiGet(
  userName,
  setFavoriteExercises,
  setFetchingStatus
) {
  // setFetchingStatus("Currently fetching");
  try {
    const response = await fetch(`/api/favoriteExercises/users/${userName}`);
    if (response.ok) {
      const dataFetch = await response.json();
      console.log("dataFetch ?", dataFetch);

      if (dataFetch.length === 0) {
        console.log("dataFetch empty", dataFetch);
      } else {
        console.log("dataFetch", dataFetch[0].favorites);
      }
      //   setFavoriteExercises(dataFetch);
      //   setFetchingStatus("Done fetching");
    } else {
      console.error("Response not OK.");
      //  setFetchingStatus("Error");
    }
  } catch (error) {
    console.error("Error fetching: ", error);
    // setFetchingStatus("Error");
  }
}
