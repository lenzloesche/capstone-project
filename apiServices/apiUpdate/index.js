export default async function apiUpdate(id, save) {
  try {
    if (id) {
      const response = await fetch(`/api/exercises/${id}`, {
        method: "PUT",
        body: JSON.stringify(save),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
    } else {
      throw new Error("Error: No _id found.");
    }
  } catch (error) {
    throw new Error("Error:" + error);
  }
}
