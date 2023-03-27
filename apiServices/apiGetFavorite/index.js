export default async function apiGet(
  userName,
  setFavoriteExercises,
  setFetchingStatus
) {
  setFetchingStatus("Currently fetching");
  try {
    const response = await fetch(`/api/favoriteExercises/users/${userName}`);
    if (response.ok) {
      const dataFetch = await response.json();

      if (dataFetch.length === 0) {
        setFavoriteExercises([]);
      } else {
        setFavoriteExercises(dataFetch[0].favorites);
      }
      setFetchingStatus("Done fetching");
    } else {
      console.error("Response not OK.");
      setFetchingStatus("Error");
    }
  } catch (error) {
    console.error("Error fetching: ", error);
    setFetchingStatus("Error");
  }
}
