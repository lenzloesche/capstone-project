export default async function apiPost(save) {
  try {
    const response = await fetch(`/api/favoriteExercises/users/${save.user}`, {
      method: "POST",
      body: JSON.stringify(save),
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
