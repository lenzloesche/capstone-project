export default async function apiGet(userName) {
  try {
    const response = await fetch(`/api/favoriteExercises/users/${userName}`);
    if (response.ok) {
      const dataFetch = await response.json();
      if (dataFetch.length === 0) {
        return [];
      } else {
        return dataFetch[0].favorites;
      }
    } else {
      throw new Error("Response not OK.");
    }
  } catch (error) {
    throw new Error("Error fetching: ", error);
  }
}
