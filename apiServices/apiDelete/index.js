export default async function apiDelete(id) {
  try {
    const response = await fetch(`/api/exercises/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}
