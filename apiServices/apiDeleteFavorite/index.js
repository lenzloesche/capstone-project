export default async function apiDelete(userName, exerciseName) {
  // setFetchingStatus("Currently Fetching");
  const response = await fetch(`/api/favoriteExercises/users/${userName}`, {
    method: "DELETE",
    body: JSON.stringify(exerciseName),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    //   setFetchingStatus("Deleted");
  } else {
    //  setFetchingStatus("Error");
    console.error(`Error: ${response.status}`);
  }
}
