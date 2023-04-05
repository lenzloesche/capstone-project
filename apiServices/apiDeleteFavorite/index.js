export default async function apiDelete(userName, exerciseName) {
  try {
    const response = await fetch(`/api/favoriteExercises/users/${userName}`, {
      method: "DELETE",
      body: JSON.stringify(exerciseName),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}
